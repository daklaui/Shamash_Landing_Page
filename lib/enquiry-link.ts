const interests: Record<string, string> = {
  xpertfactor: "xpertFactor", factorix: "factorix", "recouvrement-creances": "recouvrement",
  "document-management": "xpertArchive", "ai-automation": "aiAutomation", "web-mobile-development": "webMobile"
};
export function enquiryLink(solution: string) {
  return Object.prototype.hasOwnProperty.call(interests, solution) ? `/contact?interest=${interests[solution]}` : "/contact";
}
