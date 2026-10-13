/* eslint-disable @typescript-eslint/no-require-imports -- Node test fixture uses the CommonJS TypeScript loader. */
require('./register.cjs');
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {loadMessages} = require('../i18n/messages.ts');
test('fallback content preserves all six solutions and required enquiry messages in each locale',async()=>{
  const expected=['xpertfactor','factorix','recouvrement-creances','document-management','ai-automation','web-mobile-development'];
  for(const locale of ['fr','en','ar','tn']) {
    const messages=await loadMessages(locale);
    for(const id of expected){assert.ok(messages.home.hero.slides[id].headline,id);assert.ok(messages.home.hero.slides[id].description,id);assert.ok(messages.solutions.items[id].name,id);}
    for(const key of ['failure','rateLimited','sending','success'])assert.ok(messages.contact.form[key],key);
    for(const key of ['pauseCarousel','resumeCarousel','skipToMain'])assert.ok(messages.common.accessibility[key],key);
    if(locale!=='fr')assert.notEqual(messages.solutions.items['recouvrement-creances'].name,'Recouvrement de créances');
  }
});
