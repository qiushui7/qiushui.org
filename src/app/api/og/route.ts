import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Qiushui - Personal Blog';
  const description = searchParams.get('description') || 'Qiushui\'s personal blog';
  const image = searchParams.get('image') || 'https://r2.qiushui.org/qiushui-org.png';

  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full bg-black text-white"
      >
        {/* Main container with padding */}
        <div tw="flex w-full h-full p-16">
          {/* Left side - Text content */}
          <div tw="flex flex-col justify-between flex-1 pr-12">
            {/* Top section - Brand/Logo */}
            <div tw="flex items-center">
              <div tw="text-2xl font-bold tracking-tight">Qiushui.org</div>
            </div>

            {/* Middle section - Title and Description */}
            <div tw="flex flex-col">
              <h1
                tw="text-6xl font-bold mb-6"
                style={{
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  maxWidth: '90%',
                }}
              >
                {title}
              </h1>
              <p
                tw="text-2xl text-gray-300"
                style={{
                  lineHeight: 1.5,
                  maxWidth: '85%',
                }}
              >
                {description}
              </p>
            </div>

            {/* Bottom section - Decorative line */}
            <div tw="flex items-center">
              <div
                tw="h-1 bg-white"
                style={{
                  width: '120px',
                }}
              />
            </div>
          </div>

          {/* Right side - Image */}
          <div tw="flex items-center justify-center" style={{ width: '400px' }}>
            <div
              tw="flex overflow-hidden"
              style={{
                width: '100%',
                height: '400px',
                border: '4px solid white',
                borderRadius: '12px',
              }}
            >
              <img
                src={image}
                alt={title}
                tw="w-full h-full object-cover"
                style={{
                  filter: 'grayscale(100%) contrast(1.1)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}