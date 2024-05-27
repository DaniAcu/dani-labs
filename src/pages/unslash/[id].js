import { ImageManager } from '../../images/ImageManager';

export async function GET({ params }) {
    const { id, quality } = config(params.id);

    const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.UNSPLASH_CLIENT_ID}`);
    const data = await response.json();

    return fetch(Image(data).get(quality));
}

export async function getStaticPaths() {
  return ImageManager.images.flatMap(
    id => {
      return [
        { params: { id: id + "---high" } },
        { params: { id: id + "---low" } },
        { params: { id: id + "---normal" } }
      ]
    }
  );
}

function config(param) {
  const [id, quality = "normal"] = param.split('---');

  return { id, quality }
}

function Image(image) {
  return {
    get(quality = "normal") {
      switch (quality) {
        case "high":
          return image.urls.raw;
        
        case "low":
          return image.urls.small;

        default:
          return image.urls.regular;
      }
    }
  }
}