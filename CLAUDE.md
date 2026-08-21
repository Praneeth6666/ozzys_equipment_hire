<!-- 
# Voice - read before writing any content

When writing **any blog post, service page, or customer-facing copy** read the files in './references/':
~/Documents/Claude Code/SEO_brief/references t is |
'references/voice.md' | Marco's writing style, sentence rhythm, vocabulary, formatting, anti-patterns I

| 'references/humour.md' | How Marco handles humour (dry, industry-aimed, never puns) |
| 'references/stats.md' | Canonical real numbers - pricing, response

times, jobs, reviews I
'references/stories.md' | Recurring anecdotes (Windsor garage, fat-in-the-candle, tree roots) |

'references/opinions.md' | Hot takes on the industry, hot water
systems, pricing, older homes |

**Content rules derived from these files:**
- Never use: "unlock", "leverage", "seamless", "world-class", "in today's fast-paced world", exclamation marks, emojis
- Start with the answer; add context after
- Use real numbers from "stats.md", never round
- One story per post max (from 'stories.md', don't invent new ones) One strong opinion per post max (from 'opinions.md', backed by a number)
- Tell people when NOT to hire us - biggest voice tell Before shipping any writing, re-read "references/voice.md" → "Tells that it's AI-written and delete anything that matches.


# Testing
Before marking any task as done:
- Run 'npm run build' and fix any TypeScript or build errors Start the dev server with 'npm run dev' and check for runtime errors in the console
- Manually verify the feature works end-to-end in the browser
- Check that existing features weren't broken by the change When building a new page or API route:
- Test the happy path (everything works as expected)
- Test the error path (what happens if something goes wrong) Check that auth is working - logged-in vs logged-out behaviour
- Confirm Supabase RLS is doing what it should (data is scoped correctly per user) Never say "done" if:
The build is failing
There are console errors
The feature hasn't been tested in the browser -->