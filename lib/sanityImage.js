import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "2etdqtsv",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skYcXLGflx1M7YsHvv7tqtpKz8KmcaMUwdowZ74riYKYXMAcjuWieFYpkb7UvxdzxOuhEPUmgEo78PqcPPbuxi6hR2oKAzOGyPKzJwgzV29MVOEhwhnoU0EAg16OSYMJjDfPpdkTmFEwhh2wR44jwj7bt5sRE9aTJHZ12HqEfbnNSWfGUh4A",
  useCdn: false,
});

const build = imageUrlBuilder(client);

function urlFor(source) {
  return build.image(source);
}