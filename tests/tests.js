/**
 * Vidvamsa — Test Suite
 * tests/tests.js
 *
 * Lightweight test runner; no external framework.
 * Run in browser via tests/test-runner.html.
 * All tests are self-contained and async-safe.
 *
 * @module tests
 */

/* ── Micro Test Framework ────────────────────── */

const results = [];
let _currentSuite = '';

function suite(name, fn) {
  _currentSuite = name;
  fn();
}

function test(name, fn) {
  results.push({ suite: _currentSuite, name, fn, status: 'pending', error: null });
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(a, b, message) {
  if (a !== b) throw new Error(message || `Expected ${JSON.stringify(a)} === ${JSON.stringify(b)}`);
}

function assertIncludes(haystack, needle, message) {
  if (!String(haystack).includes(needle)) {
    throw new Error(message || `Expected "${haystack}" to include "${needle}"`);
  }
}

function assertNotIncludes(haystack, needle, message) {
  if (String(haystack).includes(needle)) {
    throw new Error(message || `Expected "${haystack}" NOT to include "${needle}"`);
  }
}

async function runAll() {
  const report = document.getElementById('report');
  report.innerHTML = '<p>Running tests…</p>';

  // Dynamically import modules under test
  const [utilsMod, configMod, rendererMod] = await Promise.all([
    import('../src/js/utils.js'),
    import('../src/js/config.js'),
    import('../src/js/renderer.js'),
  ]);

  const { slugify, capitalise, truncate, escapeHtml, icon, debounce, getActiveSection } = utilsMod;
  const { SITE, SERVICES, TEAM, CONTACT } = configMod;
  const { renderStat, renderFAQItem, renderFormField, renderSupportChannel } = rendererMod;

  /* ════════════════════════════════════════════
     SUITE: utils.js
     ════════════════════════════════════════════ */
  suite('utils.js — slugify', () => {
    test('converts spaces to hyphens', () => {
      assertEqual(slugify('Hello World'), 'hello-world');
    });
    test('lowercases input', () => {
      assertEqual(slugify('VIDVAMSA'), 'vidvamsa');
    });
    test('strips non-alphanumeric characters', () => {
      assertEqual(slugify('AI & Automation!'), 'ai--automation');
    });
    test('handles empty string', () => {
      assertEqual(slugify(''), '');
    });
  });

  suite('utils.js — capitalise', () => {
    test('capitalises first letter', () => {
      assertEqual(capitalise('technology'), 'Technology');
    });
    test('leaves already-capitalised unchanged', () => {
      assertEqual(capitalise('Vidvamsa'), 'Vidvamsa');
    });
    test('handles empty string', () => {
      assertEqual(capitalise(''), '');
    });
  });

  suite('utils.js — truncate', () => {
    test('returns original string if within length', () => {
      assertEqual(truncate('Hello', 10), 'Hello');
    });
    test('truncates and adds ellipsis if over length', () => {
      const result = truncate('Hello World', 5);
      assert(result.endsWith('…'), 'Should end with ellipsis');
      assert(result.length <= 6, `Length should be ≤ 6, got ${result.length}`);
    });
  });

  suite('utils.js — escapeHtml', () => {
    test('escapes < and >', () => {
      const result = escapeHtml('<script>alert(1)</script>');
      assertNotIncludes(result, '<script>', 'Should escape <script>');
      assertIncludes(result, '&lt;script&gt;');
    });
    test('escapes ampersand', () => {
      assertIncludes(escapeHtml('A & B'), '&amp;');
    });
    test('escapes double quotes', () => {
      assertIncludes(escapeHtml('"value"'), '&quot;');
    });
    test('escapes single quotes', () => {
      assertIncludes(escapeHtml("it's"), '&#39;');
    });
    test('does not double-escape already safe text', () => {
      assertEqual(escapeHtml('Vidvamsa'), 'Vidvamsa');
    });
  });

  suite('utils.js — icon', () => {
    test('returns an SVG string', () => {
      const result = icon('home');
      assertIncludes(result, '<svg');
      assertIncludes(result, '</svg>');
    });
    test('includes the requested size', () => {
      const result = icon('home', 32);
      assertIncludes(result, 'width="32"');
      assertIncludes(result, 'height="32"');
    });
    test('falls back to layers icon for unknown name', () => {
      const result = icon('nonexistent-icon');
      assertIncludes(result, '<svg');
    });
    test('adds className when provided', () => {
      const result = icon('home', 20, 'test-class');
      assertIncludes(result, 'class="test-class"');
    });
    test('sets aria-hidden="true"', () => {
      assertIncludes(icon('home'), 'aria-hidden="true"');
    });
  });

  suite('utils.js — debounce', () => {
    test('delays function invocation', async () => {
      let count = 0;
      const fn = debounce(() => count++, 50);
      fn(); fn(); fn();
      await new Promise((r) => setTimeout(r, 100));
      assertEqual(count, 1, 'Should only fire once after debounce window');
    });
  });

  /* ════════════════════════════════════════════
     SUITE: config.js
     ════════════════════════════════════════════ */
  suite('config.js — SITE', () => {
    test('company name is defined', () => {
      assert(SITE.company.name, 'company.name should be non-empty');
    });
    test('navigation has 4 items', () => {
      assertEqual(SITE.navigation.length, 4, 'Should have exactly 4 nav items');
    });
    test('navigation ids are valid slugs', () => {
      SITE.navigation.forEach(({ id }) => {
        assert(/^[a-z0-9-]+$/.test(id), `Nav id "${id}" should be a valid slug`);
      });
    });
    test('stats array has 4 items', () => {
      assertEqual(SITE.stats.length, 4, 'Should have exactly 4 stats');
    });
    test('hero has both CTAs', () => {
      assert(SITE.hero.ctaPrimary.label,   'ctaPrimary.label missing');
      assert(SITE.hero.ctaSecondary.label, 'ctaSecondary.label missing');
    });
    test('future flags present', () => {
      assert(typeof SITE.future.enableDynamicConfig === 'boolean', 'enableDynamicConfig should be boolean');
    });
  });

  suite('config.js — SERVICES', () => {
    test('services array is non-empty', () => {
      assert(SERVICES.items.length > 0, 'Should have at least one service');
    });
    test('each service has required fields', () => {
      SERVICES.items.forEach((s) => {
        assert(s.id, `Service missing id`);
        assert(s.title, `Service "${s.id}" missing title`);
        assert(s.icon, `Service "${s.id}" missing icon`);
        assert(Array.isArray(s.highlights), `Service "${s.id}" highlights should be array`);
      });
    });
    test('at least one service is featured', () => {
      assert(SERVICES.items.some((s) => s.featured), 'At least one service should be featured');
    });
    test('process has 4 steps', () => {
      assertEqual(SERVICES.process.length, 4, 'Delivery process should have 4 steps');
    });
  });

  suite('config.js — TEAM', () => {
    test('disciplines array has 3 items', () => {
      assertEqual(TEAM.disciplines.length, 3, 'Should have 3 disciplines');
    });
    test('discipline IDs are expected values', () => {
      const ids = TEAM.disciplines.map((d) => d.id);
      assert(ids.includes('designers'),  'Missing designers discipline');
      assert(ids.includes('architects'), 'Missing architects discipline');
      assert(ids.includes('engineers'),  'Missing engineers discipline');
    });
    test('each discipline has skills and tools arrays', () => {
      TEAM.disciplines.forEach((d) => {
        assert(Array.isArray(d.skills), `${d.id} skills should be array`);
        assert(Array.isArray(d.tools),  `${d.id} tools should be array`);
      });
    });
    test('values array has 4 items', () => {
      assertEqual(TEAM.values.length, 4, 'Should have 4 company values');
    });
  });

  suite('config.js — CONTACT', () => {
    test('FAQ has at least 3 items', () => {
      assert(CONTACT.faq.length >= 3, 'Should have at least 3 FAQ items');
    });
    test('each FAQ has id, question and answer', () => {
      CONTACT.faq.forEach((f) => {
        assert(f.id,       'FAQ missing id');
        assert(f.question, 'FAQ missing question');
        assert(f.answer,   'FAQ missing answer');
      });
    });
    test('form fields include required name and email', () => {
      const ids = CONTACT.form.fields.map((f) => f.id);
      assert(ids.includes('name'),  'Form should have name field');
      assert(ids.includes('email'), 'Form should have email field');
    });
    test('support channels are non-empty', () => {
      assert(CONTACT.support.channels.length > 0, 'Should have support channels');
    });
  });

  /* ════════════════════════════════════════════
     SUITE: renderer.js
     ════════════════════════════════════════════ */
  suite('renderer.js — renderStat', () => {
    test('renders stat value and label', () => {
      const html = renderStat({ value: '50+', label: 'Projects' });
      assertIncludes(html, '50+');
      assertIncludes(html, 'Projects');
    });
    test('escapes HTML in value', () => {
      const html = renderStat({ value: '<b>test</b>', label: 'Label' });
      assertNotIncludes(html, '<b>test</b>', 'Should escape raw HTML in value');
    });
  });

  suite('renderer.js — renderFAQItem', () => {
    const faq = { id: 'faq-1', question: 'What is this?', answer: 'This is a test.' };

    test('renders question text', () => {
      assertIncludes(renderFAQItem(faq), 'What is this?');
    });
    test('renders answer text', () => {
      assertIncludes(renderFAQItem(faq), 'This is a test.');
    });
    test('renders aria-expanded="false" initially', () => {
      assertIncludes(renderFAQItem(faq), 'aria-expanded="false"');
    });
    test('links button to answer via aria-controls', () => {
      const html = renderFAQItem(faq);
      assertIncludes(html, 'aria-controls="answer-faq-1"');
      assertIncludes(html, 'id="answer-faq-1"');
    });
  });

  suite('renderer.js — renderFormField', () => {
    test('renders text input', () => {
      const field = { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Jane' };
      const html = renderFormField(field);
      assertIncludes(html, 'type="text"');
      assertIncludes(html, 'id="name"');
      assertIncludes(html, 'required');
    });
    test('renders textarea', () => {
      const field = { id: 'msg', label: 'Message', type: 'textarea', required: false };
      assertIncludes(renderFormField(field), '<textarea');
    });
    test('renders select with options', () => {
      const field = {
        id: 'service', label: 'Service', type: 'select', required: false,
        options: ['Option A', 'Option B'],
      };
      const html = renderFormField(field);
      assertIncludes(html, '<select');
      assertIncludes(html, 'Option A');
      assertIncludes(html, 'Option B');
    });
    test('required field has aria-required="true"', () => {
      const field = { id: 'email', label: 'Email', type: 'email', required: true, placeholder: '' };
      assertIncludes(renderFormField(field), 'aria-required="true"');
    });
  });

  suite('renderer.js — renderSupportChannel', () => {
    test('renders email channel type', () => {
      const ch = { type: 'email', label: 'Email Support', value: 'support@test.com', available: '24/7' };
      const html = renderSupportChannel(ch);
      assertIncludes(html, 'Email Support');
      assertIncludes(html, 'support@test.com');
      assertIncludes(html, '24/7');
    });
  });

  /* ════════════════════════════════════════════
     SUITE: XSS Safety
     ════════════════════════════════════════════ */
  suite('XSS Safety — renderer.js', () => {
    test('renderStat escapes dangerous label', () => {
      const html = renderStat({ value: '1', label: '<img src=x onerror=alert(1)>' });
      assertNotIncludes(html, 'onerror=alert');
    });
    test('renderFAQItem escapes dangerous question', () => {
      const faq = { id: 'xss', question: '<script>evil()</script>', answer: 'safe' };
      assertNotIncludes(renderFAQItem(faq), '<script>evil()</script>');
    });
  });

  /* ── Execute and Report ──────────────────── */
  for (const t of results) {
    try {
      await t.fn();
      t.status = 'pass';
    } catch (err) {
      t.status = 'fail';
      t.error = err.message;
    }
  }

  _renderReport(results);
}

function _renderReport(results) {
  const report = document.getElementById('report');
  const pass = results.filter((r) => r.status === 'pass').length;
  const fail = results.filter((r) => r.status === 'fail').length;
  const total = results.length;

  const suites = {};
  results.forEach((r) => {
    if (!suites[r.suite]) suites[r.suite] = [];
    suites[r.suite].push(r);
  });

  let html = `
    <div style="margin-bottom:24px; padding:16px; border-radius:8px; background:${fail === 0 ? '#f0fdf4' : '#fff5f5'}; border:1px solid ${fail === 0 ? '#bbf7d0' : '#fecaca'};">
      <h2 style="margin:0;font-size:20px;color:${fail === 0 ? '#166534' : '#991b1b'}">
        ${fail === 0 ? '✅ All tests passed' : `❌ ${fail} test${fail > 1 ? 's' : ''} failed`}
      </h2>
      <p style="margin:4px 0 0;font-size:14px;color:#555;">${pass} / ${total} tests passed</p>
    </div>
  `;

  for (const [suiteName, tests] of Object.entries(suites)) {
    const suiteFail = tests.filter((t) => t.status === 'fail').length;
    html += `
      <details open style="margin-bottom:16px; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
        <summary style="padding:12px 16px; background:#f9fafb; cursor:pointer; font-weight:600; font-size:14px; list-style:none; display:flex; align-items:center; gap:8px;">
          <span>${suiteFail === 0 ? '✅' : '❌'}</span>
          <span>${suiteName}</span>
          <span style="margin-left:auto; font-weight:400; color:#6b7280; font-size:12px;">${tests.filter(t=>t.status==='pass').length}/${tests.length}</span>
        </summary>
        <ul style="list-style:none; padding:0; margin:0;">
          ${tests.map((t) => `
            <li style="padding:10px 16px; border-top:1px solid #f3f4f6; display:flex; align-items:flex-start; gap:10px; font-size:13px;">
              <span style="color:${t.status === 'pass' ? '#16a34a' : '#dc2626'}; flex-shrink:0; font-size:16px;">${t.status === 'pass' ? '✓' : '✗'}</span>
              <span>
                <span style="color:${t.status === 'pass' ? '#374151' : '#dc2626'}">${t.name}</span>
                ${t.error ? `<br><code style="font-size:11px;color:#dc2626;background:#fff5f5;padding:2px 6px;border-radius:3px;">${t.error}</code>` : ''}
              </span>
            </li>
          `).join('')}
        </ul>
      </details>
    `;
  }

  report.innerHTML = html;
}

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', runAll);
