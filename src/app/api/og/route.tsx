import { ImageResponse } from 'next/og';
import sharp from 'sharp';

// Convert image to PNG format if it's WebP
async function convertImageToPNG(imageUrl: string): Promise<string> {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';

    // Check if it's a WebP image
    const isWebP = contentType.includes('webp') || imageUrl.toLowerCase().endsWith('.webp');

    if (!isWebP) {
      // If not WebP, return the original URL
      return imageUrl;
    }

    // Convert WebP to PNG using sharp
    const buffer = Buffer.from(arrayBuffer);
    const pngBuffer = await sharp(buffer)
      .png()
      .toBuffer();

    // Convert to base64 data URL
    const base64 = pngBuffer.toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    // eslint-disable-next-line no-console -- Need to log errors for debugging OG image generation
    console.error('Error converting image:', error);
    return imageUrl; // Return original URL on error
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Qiushui - Personal Blog';
    const description = searchParams.get('description') || 'Qiushui\'s personal blog';
    const imageUrl = decodeURIComponent(searchParams.get('image') || 'https://r2.qiushui.org/qiushui-org.png');

    // Convert image to PNG if it's WebP
    const processedImage = await convertImageToPNG(imageUrl);

    return new ImageResponse(
      (
        <div
          tw="flex w-full h-full bg-black text-white"
        >
          <div tw="flex w-full h-full p-10">
            <div tw="flex flex-col justify-between flex-1 pr-12">
              <div tw="flex items-center">
                <div tw="text-2xl font-bold tracking-tight">Qiushui.org</div>
              </div>

              <div tw="flex flex-col">
                <h1
                  tw="text-6xl font-bold mb-6"
                  style={{
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    maxWidth: '90%',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {title}
                </h1>
                <p
                  tw="text-2xl text-gray-300"
                  style={{
                    lineHeight: 1.5,
                    maxWidth: '85%',
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {description}
                </p>
              </div>

              <div tw="flex items-center">
                <div
                  tw="h-1 bg-white"
                  style={{
                    width: '120px'
                  }}
                />
              </div>
            </div>

            <div tw="flex flex-col" style={{ width: '650px' }}>
              {/* Author section */}
              <div tw="flex items-center justify-end mb-6">
                <span tw="text-xl text-gray-300 mr-3">by</span>
                {/* eslint-disable-next-line @next/next/no-img-element -- OG Image requires standard img tag */}
                <img
                  src="https://qiushui.org/ava.jpg"
                  alt="Author"
                  tw="rounded-full"
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    border: '2px solid white'
                  }}
                />
              </div>

              {/* Main image */}
              <div
                tw="flex overflow-hidden"
                style={{
                  width: '100%',
                  height: '400px',
                  border: '4px solid white',
                  borderRadius: '12px'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- OG Image requires standard img tag */}
                <img
                  src={processedImage}
                  alt={title}
                  tw="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630
      }
    );
  } catch {
    return new Response('Failed to generate image', { status: 500 });
  }
}
