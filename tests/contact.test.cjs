/* eslint-disable @typescript-eslint/no-require-imports -- Node test fixture uses the CommonJS TypeScript loader. */
require('./register.cjs');
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {randomUUID} = require('node:crypto');
const {mkdtemp,readFile,readdir} = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const {validateEnquiry} = require('../lib/contact-schema.ts');
const {acceptEnquiry} = require('../lib/contact-delivery.ts');
const {POST} = require('../app/api/contact/route.ts');
const enquiry = {name:'Local test',email:'test@example.invalid',organization:'Test only',role:'',interest:'factorix',message:'Dummy local enquiry.',locale:'fr'};
function request(body=enquiry,headers={}) { return new Request('http://localhost/api/contact',{method:'POST',headers:{'content-type':'application/json','idempotency-key':randomUUID(),...headers},body:JSON.stringify(body)}); }
test('server rejects missing fields, unknown interests, oversized and cross-origin requests',async()=>{
  for(const value of [{...enquiry,name:''},{...enquiry,email:'test\r\n@example.invalid'},{...enquiry,interest:'unknown'},{...enquiry,message:'x'.repeat(4001)},{...enquiry,website:'spam'},null]) assert.equal(validateEnquiry(value),null);
  assert.equal((await POST(request({...enquiry,interest:'unknown'}))).status,400);
  assert.equal((await POST(request(enquiry,{'content-length':'20000'}))).status,413);
  assert.equal((await POST(request(enquiry,{origin:'https://untrusted.invalid'}))).status,403);
  assert.equal((await POST(request(enquiry,{'content-type':'text/plain'}))).status,415);
});
test('unconfigured delivery fails truthfully; storage accepts only a synced record and deduplicates across memory reset',async()=>{
  delete process.env.CONTACT_WEBHOOK_URL;delete process.env.CONTACT_STORAGE_DIR;
  const response=await POST(request());assert.equal(response.status,503);assert.deepEqual(await response.json(),{accepted:false});
  const dir=await mkdtemp(path.join(os.tmpdir(),'shamash-enquiry-test-'));process.env.CONTACT_STORAGE_DIR=dir;
  const key=randomUUID(),client=randomUUID();
  const first=await acceptEnquiry(enquiry,key,client);assert.equal(first.accepted,true);
  assert.equal(JSON.parse(await readFile(path.join(dir,key+'.json'),'utf8')).email,enquiry.email);
  globalThis.enquiryRequests.clear();
  assert.equal((await acceptEnquiry(enquiry,key,client)).accepted,true);
  assert.equal((await readdir(dir)).length,1);
  assert.equal((await acceptEnquiry({...enquiry,message:'Different payload'},key,client)).status,409);
  delete process.env.CONTACT_STORAGE_DIR;
});
test('webhook requires explicit acknowledgement, preserves idempotency, supports retry and bounds abuse',async()=>{
  const originalFetch=global.fetch;const originalToken=process.env.CONTACT_WEBHOOK_TOKEN;
  process.env.CONTACT_WEBHOOK_URL='https://test.invalid/enquiries';process.env.CONTACT_WEBHOOK_TOKEN='dummy-test-token';
  let calls=0,ack=false;
  global.fetch=async(url,options)=>{calls++;assert.equal(options.headers.Authorization,'Bearer dummy-test-token');assert.ok(options.headers['Idempotency-Key']);await new Promise(resolve=>setTimeout(resolve,15));return Response.json({accepted:ack});};
  try {
    const key=randomUUID(),client=randomUUID();assert.equal((await acceptEnquiry(enquiry,key,client)).accepted,false);
    ack=true;const [a,b]=await Promise.all([acceptEnquiry(enquiry,key,client),acceptEnquiry(enquiry,key,client)]);
    assert.equal(a.accepted,true);assert.equal(b.accepted,true);assert.equal(calls,2);
    assert.equal((await acceptEnquiry(enquiry,key,client)).accepted,true);assert.equal(calls,2);
    const limited=randomUUID();for(let i=0;i<5;i++)assert.equal((await acceptEnquiry(enquiry,randomUUID(),limited)).accepted,true);
    assert.equal((await acceptEnquiry(enquiry,randomUUID(),limited)).status,429);
  } finally {global.fetch=originalFetch;delete process.env.CONTACT_WEBHOOK_URL;if(originalToken===undefined)delete process.env.CONTACT_WEBHOOK_TOKEN;else process.env.CONTACT_WEBHOOK_TOKEN=originalToken;}
});
test('streamed body limits do not trust Content-Length',async()=>{
  const response=await POST(request({...enquiry,message:'x'.repeat(20000)}));assert.equal(response.status,413);
});
