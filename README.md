<h1>Madestays Onboarding Dashboard</h1>

<p>A responsive frontend dashboard built with Next.js, React, and TypeScript, designed for property owners to track their luxury short-term rental properties through the Madestays onboarding checklist.</p>

<hr>

<h2>🚀 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js 18 or higher</li>
</ul>

<h3>Installation &amp; Running</h3>

<p>Install dependencies:</p>

<pre><code>npm install</code></pre>

<p>Run the local development server:</p>

<pre><code>npm run dev</code></pre>

<p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to view the application.</p>

<hr>

<h2>🛠️ Project Architecture</h2>

<p>This is a purely frontend dashboard, designed to mimic a real production setup and feel.</p>

<h3>What's in the Box?</h3>

<p>The project is split into a few clear folders:</p>

<ul>
  <li><strong><code>components/</code></strong> – All the React components that make up the dashboard. Each one has a single job, which makes them easy to tweak and test.</li>
  <li><strong><code>data/</code></strong> – A mock JSON file that simulates what a real API response might look like. It includes 7 properties and 10 onboarding steps.</li>
  <li><strong><code>app/onboarding/</code></strong> – The Next.js page that ties everything together. It handles loading states and feeds data into the dashboard.</li>
  <li><strong><code>types/</code></strong> – TypeScript definitions that keep the codebase consistent and help catch errors early.</li>
</ul>

<h3>The Components (and What They Do)</h3>

<ul>
  <li><strong>OnboardingDashboard</strong> – The brains of the operation. It pulls together all the key numbers (total properties, live ones, etc.), handles filtering, and lays out the property cards.</li>
  <li><strong>OnboardingDetailModal</strong> – A pop-up that shows the full checklist for a property, including notes and a status legend.</li>
  <li><strong>OnboardingDetailSidebar</strong> – Lives inside the modal. Shows the property photo and key details like location and bedrooms.</li>
  <li><strong>OnboardingPropertyCard</strong> – The card you see for each property. It shows the image, status badge, progress bar, and quick step counts.</li>
  <li><strong>OnboardingFilterBar</strong> – A row of buttons that let you filter properties by status (e.g., Live, In Progress, Needs Attention).</li>
  <li><strong>PropertyIcon</strong> – A tiny helper component that renders consistent icons for things like beds, location, and dates.</li>
  <li><strong>Spinner</strong> – A loading spinner that shows up while data is being fetched.</li>
</ul>

<hr>

<h2>📋 Key Assumptions &amp; Design Choices</h2>

<p>Here are some of the decisions I made while building this:</p>

<ul>
  <li>
    <strong>Empty Step Lists:</strong> Some properties (like Kingsgate Mews House) don't have any onboarding tasks yet. Rather than crashing or showing weird numbers, the dashboard simply treats these as <strong>"Not Started"</strong> – no fuss, no errors.
  </li>
  <li>
    <strong>UX Blocker Visibility:</strong> If a property has 9 steps done but 1 step is stuck, I wanted that to be obvious. The dashboard flags it as <strong>"Needs Attention"</strong> so nothing important gets buried behind a high completion percentage.
  </li>
  <li>
    <strong>Modals &amp; Accessibility:</strong> The property detail checklist lives inside a modal. It supports <strong>Escape key</strong> and <strong>backdrop clicks</strong> to close – simple, intuitive, and accessible.</li>
</ul>

<hr>

<h2>🔮 With More Time...</h2>

<p>If I had more time to play with this, here's what I'd add:</p>

<ul>
  <li>
    <strong>Framer Motion Transitions:</strong> Smooth animations when filtering or opening modals – just to make the UI feel a bit more polished.
  </li>
  <li>
    <strong>Search &amp; Sorting:</strong> A search bar to quickly find properties by name or location, and sorting options (by date, bedrooms, etc.).
  </li>
  <li>
    <strong>Optimistic Local Actions:</strong> Let owners upload documents or update tasks directly, with the UI updating instantly to feel fast and responsive.
  </li>
</ul>

<hr>

<h2>🤖 My AI Tool Workflow &amp; Reflections</h2>

<p>I used an AI assistant throughout this project – mostly as a sounding board, a code reviewer, and a debugging buddy for Next.js quirks.</p>

<p>I'm pretty comfortable with AI tools, but my focus was always on steering the architecture myself. I used the AI to write cleaner, more defensive code – not to offload the thinking.</p>

<hr>

<h2>🛠️ Practical Problems We Solved Together</h2>

<h3>Handling Untidy Data (Crash Prevention)</h3>

<p><strong>The Problem:</strong> The mock data includes some realistic edge cases. For example, Kingsgate Mews House has an empty steps array (<code>steps: []</code>). If I naively divided by the array length to calculate progress, I'd end up with a <code>NaN%</code> display – which looks broken and confusing.</p>

<p><strong>How I Fixed It:</strong> I worked with the AI to move the progress logic into a standalone helper function (<code>getProgress</code>). We added a guardrail at the start: if the expected step count is zero, it simply returns <code>0%</code> and moves on. This keeps the UI stable no matter what the backend throws at it.</p>

<h3>Streamlining TypeScript Types</h3>

<p><strong>The Problem:</strong> I wanted a clean way to manage dashboard filters and status colors without updating a dozen type definitions every time I added a new status.</p>

<p><strong>How I Fixed It:</strong> We used <code>as const</code> and <code>keyof typeof</code> to derive types directly from the configuration objects. Now the TypeScript types stay in sync automatically – if I add a status, the types update themselves.</p>

<h3>Prioritizing What Matters to the User</h3>

<p><strong>The Problem:</strong> A property could have 9 steps done and 1 blocked, but a simple progress percentage might make it look like everything is fine. That's dangerous – owners need to see blockers immediately.</p>

<p><strong>How I Fixed It:</strong> We built a prioritization function (<code>getPropertySummaryStatus</code>) that checks for blockers first. If any step is blocked or needs attention, the whole property gets flagged with a clear <strong>"Needs Attention"</strong> status. Critical issues never get hidden.</p>

<h3>Fixing Next.js Quirks &amp; HTML Validation</h3>

<p><strong>The Problem:</strong> I ran into two classic issues early on. First, calculating dates dynamically caused server-client hydration mismatches. Second, wrapping cards in <code>&lt;button&gt;</code> tags created invalid HTML – you can't put <code>&lt;div&gt;</code> or <code>&lt;h3&gt;</code> inside a button.</p>

<p><strong>How I Fixed It:</strong> We refactored the cards to use semantic <code>&lt;div&gt;</code> elements with keyboard support (<code>onKeyDown</code>, <code>role="button"</code>, <code>tabIndex={0}</code>) so they're still fully accessible. For the hydration mismatch, I added an <code>isMounted</code> check so dates only render once the client is ready.</p>