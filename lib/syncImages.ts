import fs from 'fs';
import path from 'path';

export function syncHomepageImages() {
  try {
    const brainDir = 'C:\\Users\\muham\\.gemini\\antigravity-ide\\brain\\d6957bc8-ff05-458e-aa67-4dfc9cea036f';
    const userUploadedDir = path.join(brainDir, '.user_uploaded');
    const destDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Exact why choose image uploaded by user
    const exactWhyChooseSrc = path.join(userUploadedDir, 'media_1791875220935.png');
    if (fs.existsSync(exactWhyChooseSrc)) {
      fs.copyFileSync(exactWhyChooseSrc, path.join(destDir, 'why-choose-exact.png'));
      fs.copyFileSync(exactWhyChooseSrc, path.join(destDir, 'why-choose-business.jpg'));
    }

    // Industries Page clean hero banner uploaded by user (second image: media_1791882780942.png)
    const industriesBannerSrc = path.join(userUploadedDir, 'media_1791882780942.png');
    if (fs.existsSync(industriesBannerSrc)) {
      fs.copyFileSync(industriesBannerSrc, path.join(destDir, 'industries-hero-banner.png'));
      fs.copyFileSync(industriesBannerSrc, path.join(destDir, 'industries-hero-banner.jpg'));
    }

    // Value Section images uploaded by user
    const valueImages = [
      {
        src: path.join(userUploadedDir, 'media_1791880903553.jpg'),
        dest: path.join(destDir, 'value-integrity.jpg'),
      },
      {
        src: path.join(userUploadedDir, 'media_1791880910341.jpg'),
        dest: path.join(destDir, 'value-confidentiality.jpg'),
      },
      {
        src: path.join(userUploadedDir, 'media_1791880919030.jpg'),
        dest: path.join(destDir, 'value-timely.jpg'),
      },
    ];

    for (const item of valueImages) {
      if (fs.existsSync(item.src)) {
        fs.copyFileSync(item.src, item.dest);
      }
    }

    const imageMappings = [
      {
        src: path.join(brainDir, 'service_tax_gst_1791874095448.jpg'),
        dest: path.join(destDir, 'service-tax-gst.jpg'),
      },
      {
        src: path.join(brainDir, 'service_audit_assurance_1791874119003.jpg'),
        dest: path.join(destDir, 'service-audit-assurance.jpg'),
      },
    ];

    for (const mapping of imageMappings) {
      if (fs.existsSync(mapping.src) && !fs.existsSync(mapping.dest)) {
        fs.copyFileSync(mapping.src, mapping.dest);
      }
    }
  } catch (err) {
    console.error('Error syncing homepage images:', err);
  }
}
