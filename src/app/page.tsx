import Hero from '@/components/home-hero';
import Recommendation from '@/components/recommendation';
import ProfessionJourney from '@/components/profession-journey';
import type { WebSite, WithContext } from 'schema-dts';

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Qiushui',
  url: 'https://www.qiushui.org',
  image: 'https://www.qiushui.org/photo-no-bg.png',
  description: 'Qiushui\'s personal blog',
  author: {
    '@type': 'Person',
    name: 'Qiushui'
  },
  publisher: {
    '@type': 'Person',
    name: 'Qiushui'
  },
  keywords: ['Qiushui', 'personal blog', 'tech blog', 'frontend development', 'product development', 'open source projects']
};

export default function Home() {
  return (
    <>
      <script
        id="json-ld-home"
        type="application/ld+json"
        // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml -- JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen text-white relative overflow-hidden">
        <main className="relative z-10 px-4 md:px-8 lg:px-12">
          <Hero />
          <ProfessionJourney />
          <Recommendation />
        </main>
      </div>
    </>
  );
}
