const CLOUDINARY = 'https://res.cloudinary.com/do3iknsvm/image/upload';

/**
 * The house tonal treatment, applied to every photograph on the site.
 *
 * Photography here comes from many hands over many years — phone snaps, event
 * photos, mixed lighting and white balance. A duotone mapping shadows to
 * earth-900 and highlights to sky-100 removes the colour casts entirely and
 * ties every image to the palette, and the contrast bump hides the flatness
 * that low-light phone photos tend to have.
 *
 * Each effect must be its own path segment. Cloudinary applies only one `e_`
 * per transformation component, so chaining them with commas silently drops
 * all but the last.
 */
const TREATMENT = 'e_tint:100:14120f:0p:e8eae6:100p/e_contrast:15';

type PhotoOptions = {
  /** Rendered width in pixels. */
  w?: number;
  /** Aspect ratio, Cloudinary style — '21:9', '4:3', '4:5'. */
  ar?: string;
};

/** Build a treated Cloudinary URL from a version-and-file path. */
export function photo(file: string, { w, ar }: PhotoOptions = {}): string {
  const crop = ['q_auto', 'f_auto', 'c_fill', 'g_auto'];
  if (ar) crop.push(`ar_${ar}`);
  if (w) crop.push(`w_${w}`);
  return `${CLOUDINARY}/${crop.join(',')}/${TREATMENT}/${file}`;
}

/**
 * Apply the treatment to a Cloudinary URL that already carries its own
 * transform — staff portraits, for instance, are stored as full URLs in the
 * content files with their own face-aware crops. The treatment is inserted as
 * an extra component before the version segment, leaving the existing crop
 * untouched.
 */
export function treated(url: string): string {
  const marker = '/image/upload/';
  const at = url.indexOf(marker);
  if (at === -1) return url;

  const head = url.slice(0, at + marker.length);
  const segments = url.slice(at + marker.length).split('/');
  const version = segments.findIndex((s) => /^v\d+$/.test(s));

  if (version === -1) return `${head}${TREATMENT}/${segments.join('/')}`;
  segments.splice(version, 0, TREATMENT);
  return head + segments.join('/');
}
