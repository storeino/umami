'use client';
import { usePathname } from 'next/navigation';
import FilterTags from '@/components/metrics/FilterTags';
import { useNavigation } from '@/components/hooks';
import WebsiteChart from './WebsiteChart';
import WebsiteExpandedView from './WebsiteExpandedView';
import WebsiteHeader from './WebsiteHeader';
import WebsiteMetricsBar from './WebsiteMetricsBar';
import { useEffect } from 'react';
import WebsiteTableView from './WebsiteTableView';
import { FILTER_COLUMNS } from '@/lib/constants';

export default function WebsiteDetailsPage({ websiteId }: { websiteId: string }) {
  const { query } = useNavigation();
  const pathname = usePathname();

  const showLinks = !pathname.includes('/share/');
  const { view } = query;

  const params = Object.keys(query).reduce((obj, key) => {
    if (FILTER_COLUMNS[key]) {
      obj[key] = query[key];
    }
    return obj;
  }, {});
  useEffect(() => {
    // Send message to parent window with content height
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ height: height }, '*');
    };

    // Send content height initially and on resize
    sendHeight();
    window.addEventListener('resize', sendHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', sendHeight);
    };
  }, []);
  return (
    <>
      {showLinks && <WebsiteHeader websiteId={websiteId} showLinks={showLinks} />}
      <FilterTags websiteId={websiteId} params={params} />
      <WebsiteMetricsBar websiteId={websiteId} showFilter={true} showChange={true} sticky={false} />
      <WebsiteChart websiteId={websiteId} />
      {!view && <WebsiteTableView websiteId={websiteId} />}
      {view && <WebsiteExpandedView websiteId={websiteId} />}
    </>
  );
}
