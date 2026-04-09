insert into public.site_settings (
  company_name, hero_title, hero_subtitle, about_summary, mission, vision,
  address, email, phone, business_number, instagram_url, youtube_url,
  privacy_policy, terms_of_service, footer_text
)
values (
  'Lunetra Entertainment Network',
  'Global K-POP Projects, Designed for Fans and Future Stars',
  'From fan-driven challenges to global auditions, we build the next wave of entertainment experiences.',
  'Lunetra Entertainment Network connects artists, creators, and global fans through original project campaigns, auditions, and cross-border cultural programs.',
  'Create a scalable platform where emerging talent and active fandoms co-create entertainment culture.',
  'Become Asia''s most trusted project operations partner for next-generation entertainment brands.',
  '5F, 417 Teheran-ro, Gangnam-gu, Seoul, Republic of Korea',
  'contact@twinklenetwork.com',
  '+82-2-512-9870',
  '284-81-00921',
  'https://instagram.com/twinklenetwork',
  'https://youtube.com/@twinklenetwork',
  'We collect only the minimum personal data required for service operations and audition processing. Data is encrypted at rest and retained under legal requirements.',
  'By using this platform, you agree to our service terms, participation guidelines, and project operation policy.',
  'Lunetra Entertainment Network Co., Ltd. All rights reserved.'
)
on conflict do nothing;

insert into public.banners (title, subtitle, image_url, link_url, sort_order, is_active)
values
  (
    'Lunetra Summer Dance Challenge 2026',
    'Join global fans and creators in our synchronized dance mission.',
    'https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1920&q=80',
    '/challenges/twinkle-summer-dance-challenge-2026',
    1,
    true
  ),
  (
    'Global Idol Audition: Seoul x Tokyo',
    'Applications now open for singer, dancer, and creator tracks.',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1920&q=80',
    '/auditions/global-idol-audition-seoul-tokyo-2026',
    2,
    true
  ),
  (
    'TWN Artist Journal Vol.14',
    'Inside the project stories behind our latest debut program.',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1920&q=80',
    '/magazines/twn-artist-journal-vol-14',
    3,
    true
  );

insert into public.challenges (
  title, slug, thumbnail_url, cover_image_url, short_description, description,
  target_audience, benefits, precautions, start_date, end_date, status, is_featured
)
values
  (
    'Lunetra Summer Dance Challenge 2026',
    'twinkle-summer-dance-challenge-2026',
    'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1600&q=80',
    'Fan creators reimagine the official point choreography with original styling.',
    'Submit your own choreography clip inspired by the official mission track. Finalists are selected by combined fan and producer votes.',
    'Dance creators, fandom communities, and performance-focused teams worldwide',
    'Official feature on Lunetra channels, studio collaboration session, and global showcase ticket support',
    'All uploads must include original movement composition and must not infringe third-party copyrighted choreography.',
    '2026-04-01',
    '2026-05-10',
    'ongoing',
    true
  ),
  (
    'Project Echo: Vocal Cover Relay',
    'project-echo-vocal-cover-relay',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80',
    'A multilingual vocal relay campaign connecting fan vocalists across regions.',
    'Record a short vocal performance and nominate the next participant from a different country. The relay grows into one connected global performance line.',
    'Vocal-focused creators, multilingual fan communities, and trainee hopefuls',
    'Top relay teams join an online session with TWN A&R directors.',
    'Use approved instrumental files and include platform hashtag metadata in your upload.',
    '2026-05-20',
    '2026-06-30',
    'upcoming',
    false
  ),
  (
    'Neon Stage Performance Mission',
    'neon-stage-performance-mission',
    'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1600&q=80',
    'A concept performance challenge blending dance, styling, and storytelling.',
    'Participants create a full stage-style short performance with costume concept, camera blocking, and ending pose narrative.',
    'Performance creators and visual directors',
    'Winners receive production mentoring and a teaser shoot with Lunetra media team.',
    'No dangerous stunts and no unauthorized music remixes are allowed.',
    '2026-02-10',
    '2026-03-20',
    'ended',
    false
  );

insert into public.auditions (
  title, slug, category, thumbnail_url, cover_image_url, short_description,
  description, requirements, submission_guide, start_date, end_date, status, is_featured
)
values
  (
    'Global Idol Audition: Seoul x Tokyo 2026',
    'global-idol-audition-seoul-tokyo-2026',
    'singer',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=80',
    'A global vocalist track designed for next-generation pop acts.',
    'Applicants go through digital screening, live callback, and final camp assessment in Seoul.',
    'Applicants born between 2002 and 2012, any nationality',
    'Upload one vocal video and one profile introduction file.',
    '2026-03-25',
    '2026-05-31',
    'open',
    true
  ),
  (
    'Screen Rising Actor Open Call',
    'screen-rising-actor-open-call',
    'actor',
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516280030429-27679b3dc9cf?auto=format&fit=crop&w=1600&q=80',
    'Film and series actor discovery program with studio workshops.',
    'Selected applicants participate in short scene tests and expressive coaching.',
    'Applicants with basic Korean or English communication',
    'Submit monologue video under 90 seconds and profile sheet.',
    '2026-04-01',
    '2026-06-15',
    'open',
    false
  ),
  (
    'Runway Next Model Recruitment',
    'runway-next-model-recruitment',
    'model',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
    'Model recruitment track focused on fashion and campaign projects.',
    'Portfolio review plus camera test sessions with partner brands.',
    'Open to all genders, minimum age 15',
    'Upload profile images and one walk clip.',
    '2026-03-10',
    '2026-04-20',
    'closed',
    false
  ),
  (
    'Street Performance Dancer Session',
    'street-performance-dancer-session',
    'dancer',
    'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
    'High-energy dancer recruitment for stage-focused projects.',
    'Video screening followed by choreography workshop evaluation.',
    'Dance experience preferred, solo or crew applicants accepted',
    'Upload one freestyle clip and one choreography clip.',
    '2026-04-05',
    '2026-06-01',
    'open',
    false
  ),
  (
    'Creator Lab: Shortform Performance Hosts',
    'creator-lab-shortform-performance-hosts',
    'creator',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    'Creator track for MC-style storytelling and fan communication.',
    'Program develops camera presence, format planning, and live audience engagement.',
    'Any nationality, strong communication skills required',
    'Submit one self-introduction video and one content sample link.',
    '2026-04-08',
    '2026-06-10',
    'open',
    true
  );

insert into public.magazines (
  title, slug, thumbnail_url, cover_image_url, summary, content,
  category, published_at, is_featured, is_public
)
values
  (
    'TWN Artist Journal Vol.14',
    'twn-artist-journal-vol-14',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80',
    'A closer look at our project-building process behind the latest debut unit.',
    'This issue covers casting strategy, mentorship design, and cross-market release planning that shaped our latest project cycle.',
    'project',
    '2026-04-01T09:00:00+09:00',
    true,
    true
  ),
  (
    'Fan Challenge Recap: Neon Stage',
    'fan-challenge-recap-neon-stage',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80',
    'Highlights from our global challenge participants and top team interviews.',
    'Top creators from 18 countries shared concept videos, and judges selected final teams based on choreography quality and storytelling.',
    'event',
    '2026-03-18T10:00:00+09:00',
    false,
    true
  ),
  (
    'Inside A&R: Building a Vocal Team',
    'inside-ar-building-a-vocal-team',
    'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80',
    'How our producers evaluate tone, expression, and team chemistry.',
    'The A&R studio shares practical screening standards and coaching frameworks for talent development.',
    'artist',
    '2026-02-28T14:00:00+09:00',
    false,
    true
  ),
  (
    'Tokyo Partnership Studio Opens',
    'tokyo-partnership-studio-opens',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1464375117522-1311dd7d5b7f?auto=format&fit=crop&w=1600&q=80',
    'Lunetra expands local production support through a new Tokyo partner studio.',
    'The new hub supports artist content production, trainee workshops, and regional fan programming.',
    'news',
    '2026-01-22T11:00:00+09:00',
    false,
    true
  );
