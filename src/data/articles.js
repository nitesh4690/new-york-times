// =====================================================================
// The Daily Pulse — Article data store (simulated news CMS)
// =====================================================================

export const categories = [
  { slug: 'world', name: 'World' },
  { slug: 'politics', name: 'Politics' },
  { slug: 'business', name: 'Business' },
  { slug: 'technology', name: 'Technology' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'health', name: 'Health' },
  { slug: 'culture', name: 'Culture' },
];

const categoryByName = (name) => {
  const found = categories.find((c) => c.name === name);
  return found ? found.slug : 'world';
};

// ---------- Helper to build an article object ----------
const article = (
  id,
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  image,
  body,
  { featured = false, trending = false, breaking = false } = {}
) => ({
  id,
  category,
  categorySlug: categoryByName(category),
  title,
  excerpt,
  author,
  date,
  readTime,
  image,
  body,
  featured,
  trending,
  breaking,
});

export const articles = [
  article(
    1,
    'World',
    'Global Climate Summit Reaches Historic Agreement on Fossil Fuel Transition',
    'Leaders from 185 nations have committed to an accelerated timeline for phasing out fossil fuels, a pact many are calling the most significant climate accord in a decade.',
    'Amara Okafor',
    '2024-11-08',
    6,
    'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1400&q=80',
    [
      'After two weeks of tense negotiations, delegates from 185 countries emerged from the sprawling convention center with a document many diplomats quietly admit they did not think possible last spring.',
      'The agreement commits signatories to a "substantial and measurable decline" in coal, oil and natural gas use by the middle of the decade, with richer nations expected to move faster and to help fund the transition in developing economies.',
      '"This is the moment the world stopped negotiating with itself and started negotiating with reality," said the conference president in a closing statement that drew a rare standing ovation.',
      'Environmental groups offered guarded praise. "The text is not perfect," said one campaign director. "But it finally names the problem. Naming it is the first step to solving it."',
      'Analysts say the real test will come in the coming months, when countries must submit updated national plans that align with the new targets. Several governments already face domestic opposition from energy-producing regions.',
      'For now, though, the mood among delegates was closer to relief than victory. The deal survives on paper — and for the first time in years, so does the process itself.',
    ],
    { featured: true, breaking: true, trending: true }
  ),
  article(
    2,
    'Technology',
    'The Quiet Rise of Small Language Models: Why Bigger Is No Longer Always Better',
    'A new generation of compact AI models is challenging the assumption that scale equals intelligence, and startups are taking notice.',
    'Dmitri Volkov',
    '2024-11-07',
    8,
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
    [
      'For the better part of a decade, the prevailing wisdom in artificial intelligence was simple: throw more compute at the problem. The result has been extraordinary — and eye-wateringly expensive.',
      'Now a quieter counter-movement is gaining momentum. A wave of small language models, many of them open source, are matching the performance of systems hundreds of times their size on specialized tasks.',
      '"The frontier models are like diesel locomotives," said one researcher at a mid-sized AI lab. "Small models are the electric bicycles. You do not need a locomotive to deliver a letter."',
      'The economics are compelling. Startups that once budgeted millions for API calls now fine-tune compact models on a single server, keeping data on-premises and costs in the hundreds of dollars.',
      'Regulators, too, are watching. Small models are easier to audit, easier to run locally, and harder to accidentally embed in every corner of the internet.',
      'To be clear, nobody is predicting the end of large models. But the industry narrative — that intelligence scales with parameter count — has quietly, and perhaps permanently, lost its monopoly.',
    ],
    { featured: true, trending: true }
  ),
  article(
    3,
    'Business',
    'Global Markets Rally as Inflation Cools Faster Than Economists Expected',
    'Central banks face a delicate path as investors cheer disinflation — and bet big on rate cuts in the new year.',
    'Priya Raghavan',
    '2024-11-08',
    5,
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
    [
      'Stock markets across Asia and Europe extended a multi-week rally on Thursday after the latest inflation reading came in well below forecast, reigniting bets that the era of aggressive monetary tightening is over.',
      'The benchmark consumer price index rose 2.1% year over year, down from 2.9% the prior month and below every estimate in a Bloomberg survey of economists.',
      'Bond yields tumbled as traders priced in as many as three quarter-point rate cuts by mid-year. Currency markets were more cautious, with the dollar slipping modestly against a basket of peers.',
      '"The inflation fight is effectively won," said the chief strategist at a major European bank. "The question now is whether central banks snatch defeat from the jaws of victory."',
      'Some economists warned that celebrations may be premature, noting that services inflation remains sticky and that supply chains — the original source of the problem — have only just returned to normal.',
      'Whatever the risks, the mood in trading rooms was unmistakably buoyant. As one veteran trader put it: "The market has stopped obsessing over the Fed\'s every word. That alone is newsworthy."',
    ],
    { featured: true }
  ),
  article(
    4,
    'Sports',
    'Underdogs to Kings: The Improbable Run That Has a Nation Dreaming',
    'A squad assembled on a modest budget is one game from immortality after a tournament run nobody saw coming.',
    'Carlos Mendes',
    '2024-11-06',
    7,
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1400&q=80',
    [
      'Eighteen months ago, they were written off by pundits as a transitional team, a collection of promising players without a spine. Tonight, they are ninety minutes from a fairytale.',
      'The journey has been defined by moments of individual brilliance and improbable resilience — a last-minute equalizer against the tournament favorites, a penalty shootout won by a goalkeeper who was unemployed last season.',
      '"Nobody gave us a chance, and honestly, that freed us," said the manager, whose calm press-conference delivery has become an internet phenomenon. "You play best when nobody expects you to win."',
      'The numbers tell the story. The squad\'s combined transfer value is a fraction of their semifinal opponents\', yet they have out-ran, out-pressed and out-scored every rival.',
      'Back home, millions have found common cause. Public squares have filled with flags; schools have rearranged timetables; a bakery in the capital now sells a penalty-kick-shaped pastry that sells out by noon.',
      'Whatever happens in the final, an entire generation of young players now believes the improbable is possible. In the end, that may be the real prize.',
    ],
    { trending: true }
  ),
  article(
    5,
    'Health',
    'Scientists Uncover New Clues in the Body\'s Fight Against Chronic Inflammation',
    'A decade-long study points to a single protein as a master switch — and early trials suggest it can be safely targeted.',
    'Elena Fischer',
    '2024-11-05',
    9,
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1400&q=80',
    [
      'For years, chronic inflammation has been the silent engine behind heart disease, diabetes, and a dozen conditions that shorten lives. A new study published this week may have found the switch that turns it off.',
      'The research, a collaboration across four continents, identifies a protein that acts as a master regulator, dialing immune responses up and down in ways that had previously seemed contradictory.',
      '"We kept pulling the same thread for a decade and it kept leading us back to this molecule," said the study\'s lead author. "When we blocked it in animal models, the cascade simply stopped."',
      'Early human trials, involving a few hundred patients with chronic joint pain, reported that the treatment was well tolerated — and, for a significant subset, transformative.',
      'Independent experts urged caution. "A powerful switch and a safe switch are not the same thing," said one immunologist not involved in the work. "The immune system does not like being simplified."',
      'Still, for the millions who manage chronic conditions with an exhausting array of medications, the prospect of a single, targeted therapy is a genuinely hopeful sign — one worth watching closely.',
    ],
    {}
  ),
  article(
    6,
    'Culture',
    'The Museum Reimagined: How Technology Is Rewriting the Visitor Experience',
    'From AI-guided tours to immersive reconstructions, cultural institutions are betting that wonder can be engineered.',
    'Isabella Moreau',
    '2024-11-04',
    6,
    'https://images.unsplash.com/photo-1566127444941-b3ad1c4164e9?auto=format&fit=crop&w=1400&q=80',
    [
      'The old museum was a place you went to look. The new museum, if the industry\'s most ambitious institutions have their way, is a place you go to feel, to argue, and to wander into worlds that no longer exist.',
      'This year alone, major galleries have opened exhibitions built around virtual reconstructions of sunken cities, interactive canvases that change with the viewer, and audio guides generated fresh for every visitor.',
      '"The technology is not the point," said the director of a national museum that just completed a three-year digital overhaul. "The point is that a twelve-year-old leaves and cannot stop talking about it."',
      'Early data suggests they may be onto something. Attendance among under-30s has grown sharply at institutions that bet early on immersive programming, even as traditional galleries report flat numbers.',
      'Critics worry about a creeping sameness — every museum chasing the same dazzling spectacle. "Wonder is not a plug-in," one curator warned. "If everything glows, nothing sparks."',
      'The truth probably lies somewhere between the two camps. But after a decade of box-ticking digital strategies, it is remarkable to watch museums argue about magic again.',
    ],
    {}
  ),
  article(
    7,
    'World',
    'In the Shadow of a Border: Inside the Town Where Two Worlds Meet',
    'A reporter embeds with truckers, smugglers and border guards along one of the most surveilled frontiers on Earth.',
    'Samuel Okonkwo',
    '2024-11-03',
    11,
    'https://images.unsplash.com/photo-1489514354504-1653aa90e34e?auto=format&fit=crop&w=1400&q=80',
    [
      'Three in the morning. The checkpoint is quiet, save for the hum of generators and the occasional bark of a dog. Then the first convoy of the day appears: headlights stitched across the desert like beads on a thread.',
      'This town, strung along a border drawn a century ago, has built its entire economy on the seams between nations. Truckers rest here, traders swap goods, and a vast, invisible economy moves through the gaps.',
      '"The border does not exist for the people," an old smuggler tells me, not joking. "It exists for the paperwork." He has been crossing for forty years and claims to have never once seen a map.',
      'Authorities are less romantic. The frontier is now a lattice of cameras, drones and biometric gates. A new wall, part concrete and part algorithm, rises along the horizon.',
      'Locals have adapted, as locals always do. Peoples\' homes straddle the line in ways that bureaucracy has never quite captured; a kitchen here, a bedroom there, a family on both sides.',
      'Late in the week, a young girl asks me which country I am from. When I answer, she shrugs: "The birds never answer that question." She is eight. She may be the wisest person I meet all year.',
    ],
    { trending: true }
  ),
  article(
    8,
    'Politics',
    'Parliament Faces Longest Budget Debate in a Decade as Spending Fight Deepens',
    'Opposition parties unite against sweeping cuts, while backbench members on all sides warn of a fractious autumn.',
    'Harriet Vance',
    '2024-11-02',
    6,
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80',
    [
      'The chamber was unusually full on Tuesday evening, and noisier than it has been in years, as parliament opened what aides now concede may be the longest budget debate in a decade.',
      'At stake is a package of spending cuts that the government defends as necessary discipline and its opponents describe as a quiet dismantling of public services.',
      'The coalition of resistance is strange by any measure: hard-left reformers, rural conservatives and single-issue independents, united by little more than the same chart — a steeply falling line the treasury calls "efficiency".',
      'Behind the scenes, however, MPs describe a messier reality: regional allocations, pet projects and the careful arithmetic of marginal seats.',
      '"The budget is never really about the budget," one veteran legislator observed. "It is about who goes home in four years having built something."',
      'With the decisive votes expected late Friday, party whips are doing what whips do. But even they admit the numbers are uncomfortably tight — and the knives, unusually sharp.',
    ],
    {}
  ),
  article(
    9,
    'Technology',
    'Beyond the Hype: What a City-Sized AI Data Center Would Actually Do',
    'Proposals for gigawatt-scale compute campuses raise a simple question nobody quite wants to answer: who needs this?',
    'Dmitri Volkov',
    '2024-11-01',
    7,
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    [
      'The renderings are magnificent: mirrored glass, cooling towers like cathedral spires, and enough server racks to house a small nation. What they do not show is the electricity bill.',
      'A new wave of proposals imagines data centers the size of towns, drawing power comparable to mid-sized cities, all in service of the next generation of artificial intelligence.',
      'The companies behind them argue that frontier models are too big for today\'s grids, and that concentrated campuses are simply the most efficient way to build them.',
      'Engineers are more skeptical. "There is a tendency to assume the demand curve is a straight line," one grid operator said. "Real-world compute is a lot lumpier than the brochures suggest."',
      'Communities in the path of these projects have begun pushing back, questioning water use, land use and the modest number of permanent jobs a fully automated facility actually creates.',
      'The honest answer — rarely said aloud — is that nobody knows whether demand will justify the scale. The campuses may be built; the models may shrink; history suggests both will happen at once.',
    ],
    {}
  ),
  article(
    10,
    'Business',
    'Small Ports, Big Ambitions: The Forgotten Harbors Competing for the World\'s Cargo',
    'Global shipping is being re-routed, and a handful of unlikely middle-sized ports are cashing in.',
    'Priya Raghavan',
    '2024-10-31',
    8,
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=80',
    [
      'For the better part of a century, the global map of trade was written in a dozen great harbors. Megaports grew, routes froze, and everything else was a footnote.',
      'Then the world went sideways. Bottlenecks, storms and disputes sent shippers scrambling for alternatives — and a second tier of ports, long ignored, discovered their moment.',
      'These mid-sized harbors offer something the giants cannot: berths on demand, uncrowded roads and a willingness to negotiate. Cargo, it turns out, follows agility as much as geography.',
      'Investment is pouring in. Cranes are being ordered, container yards paved, and, in a telling sign, the supply of air-conditioned office space near the docks has abruptly run dry.',
      '"Five years ago, nobody returned our calls," laughed the director of one such port, watching a ship almost bigger than his terminal edge past the breakwater. "Now our problem is saying no politely."',
      'Whether the boom lasts depends on whether global trade settles into new rhythms or reverts to familiar ones. Either way, a whole class of sleepy harbors will never be entirely sleepy again.',
    ],
    {}
  ),
  article(
    11,
    'Politics',
    'The Politics of Enough: Why Moderation Is Quietly Making a Comeback',
    'After years of polarization, a new cohort of politicians is betting that tired voters want boring competence.',
    'Harriet Vance',
    '2024-10-29',
    10,
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1400&q=80',
    [
      'There is a particular sound in politics that has been rare for years: the sound of a crowd cheering a spreadsheet.',
      'Across separate elections this season, candidates who campaigned on balanced budgets, measured tone and unglamorous competence have outperformed expectations, often against louder rivals.',
      'The pattern has analysts reaching for the same word: exhaustion. Polarization was exhausting; outrage was exhausting; even the news was exhausting.',
      '"People did not decide they love centrism," one strategist said. "They decided they are tired. And tired people vote for the party that promises the fewest arguments."',
      'The comeback is not without risk. Moderation has a thin floor — it offers little to the furious, and furious voters are the most reliable ones.',
      'For now, though, swing districts have swung toward the safe pair of hands. Whether that lasts through a full term, or a full crisis, is the question nobody in a crowded centrist room dares to answer.',
    ],
    {}
  ),
  article(
    12,
    'Sports',
    'Strategy, Science and the Search for the Perfect Seven-Second Sprint',
    'Cycling\'s great paradox: the sport\'s most glamorous race is decided by margins that last no longer than a sneeze.',
    'Carlos Mendes',
    '2024-10-28',
    6,
    'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1400&q=80',
    [
      'The entire race comes down to a stretch of road that most motorists would not even think of as a hill. From the flamme rouge to the line, the leaders will spend roughly seven seconds at full throttle.',
      'Those seven seconds are the product of three weeks of racing, thousands of training kilometers, and a small army of nutritionists, aerodynamicists and tire engineers.',
      '"Every rider in the front group wants the same thing," explained a team performance director. "To arrive at that corner first, or at least not second. Everything else is a sacrifice to make that true."',
      'The science has become pharaonic: wind tunnels, computational fluid dynamics, and data models that simulate every possible position those seven seconds can be raced.',
      'What the models cannot capture is the race itself — the glances, the barges, the tiny accelerations that decide who is moving fastest when the real effort must begin.',
      'In the end, the viewer sees only a blur. But between the wind tunnel and the finish line there is a whole sport, hiding in plain sight, doing everything it can to own a moment that lasts no longer than a sneeze.',
    ],
    {}
  ),
];

// =====================================================================
// Selectors
// =====================================================================

export const getArticleById = (id) => articles.find((a) => a.id === Number(id)) || null;

export const getArticlesByCategory = (slug) =>
  articles.filter((a) => a.categorySlug === slug);

export const getFeaturedArticles = () => articles.filter((a) => a.featured);

export const getBreakingArticles = () => articles.filter((a) => a.breaking);

export const getTrendingArticles = () => articles.filter((a) => a.trending);

export const getLatestArticles = (count = 6) =>
  [...articles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);

export const getRelatedArticles = (article, count = 3) =>
  articles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => {
      const sameCat = Number(b.categorySlug === article.categorySlug) -
        Number(a.categorySlug === article.categorySlug);
      if (sameCat !== 0) return sameCat;
      return new Date(b.date) - new Date(a.date);
    })
    .slice(0, count);

export const searchArticles = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return articles.filter((a) =>
    [a.title, a.excerpt, a.author, a.category].join(' ').toLowerCase().includes(q)
  );
};

export const getDateLabel = (isoDate) => {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};