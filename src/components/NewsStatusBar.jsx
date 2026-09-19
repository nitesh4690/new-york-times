import { useNews } from '../context/NewsContext.jsx';

export default function NewsStatusBar() {
  const { status, sources, error, refresh, refreshedAt } = useNews();

  if (status === 'loading') {
    return (
      <div className="news-status is-loading" role="status">
        <span className="dot" aria-hidden="true" />
        <span className="status-label">Loading</span>
        <span>Fetching the latest headlines from live feeds…</span>
      </div>
    );
  }

  const time = refreshedAt
    ? new Date(refreshedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`news-status is-${status}`}>
      <span className="dot" aria-hidden="true" />
      {status === 'live' ? (
        <>
          <span className="status-label">Live</span>
          <span>
            Updated {time} · {sources.join(', ')}
          </span>
          <button type="button" className="status-refresh" onClick={refresh}>
            Refresh
          </button>
        </>
      ) : (
        <>
          <span className="status-label">Offline</span>
          <span>Live feeds unreachable — showing the saved edition.</span>
          <button
            type="button"
            className="status-refresh"
            onClick={refresh}
            title={error || 'Retry fetching live news'}
          >
            Retry
          </button>
        </>
      )}
    </div>
  );
}