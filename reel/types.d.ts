// Remotion's bundler resolves image imports to URLs. Declared so the photos
// can be pulled straight from the site's own public/images rather than
// duplicated into this folder.
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
