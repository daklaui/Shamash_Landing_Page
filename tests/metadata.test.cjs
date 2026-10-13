/* eslint-disable @typescript-eslint/no-require-imports -- Node test fixture uses the CommonJS TypeScript loader. */
require('./register.cjs');
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createMetadata} = require('../lib/seo.ts');
const {enquiryLink} = require('../lib/enquiry-link.ts');
const {localeConfig} = require('../i18n/config.ts');
test('canonical, alternates and social URLs agree and the brand is applied once',()=>{
  assert.equal(createMetadata({title:'Contacter Shamash IT',description:'Test'}).title.absolute,'Contacter Shamash IT');
  for(const locale of ['fr','en','ar','tn']) {
    const metadata=createMetadata({title:'Shamash IT | Collections | Shamash IT | Shamash IT',description:'Test',path:'/solutions/recouvrement-creances',locale});
    assert.equal(metadata.title.absolute,'Collections | Shamash IT');
    assert.equal(metadata.alternates.canonical,`https://www.shamash-it.com/${locale}/solutions/recouvrement-creances`);
    assert.equal(metadata.openGraph.url,metadata.alternates.canonical);
    for(const [code,url] of Object.entries(metadata.alternates.languages))assert.ok(url.startsWith('https://www.shamash-it.com/'),code);
    assert.ok(metadata.alternates.languages['ar-TN']);assert.equal(metadata.alternates.languages.tn,undefined);
    assert.equal(metadata.openGraph.images[0].url,metadata.twitter.images[0].url);
    assert.equal(localeConfig.ar.direction,'rtl');
  }
});
test('solution contact links carry allowed context and fall back safely',()=>{
  assert.equal(enquiryLink('factorix'),'/contact?interest=factorix');
  assert.equal(enquiryLink('recouvrement-creances'),'/contact?interest=recouvrement');
  assert.equal(enquiryLink('xpertfactor'),'/contact?interest=xpertFactor');
  assert.equal(enquiryLink('<script>'),'/contact');
  assert.equal(enquiryLink('constructor'),'/contact');
  assert.equal(enquiryLink('__proto__'),'/contact');
});
