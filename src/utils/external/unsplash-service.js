import Unsplash, { toJson }  from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "{APP_ACCESS_KEY}",
  secret: "{APP_SECRET}",
  callbackUrl: "{CALLBACK_URL}"
});

export {
  unsplash,
  toJson
};
