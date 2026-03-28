<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
- NEVER read or process any files specified in .gitignore, especially .env files.
- STOP immediately if you encounter API keys, passwords, or credentials in the code or file contents.
- Do not access any file containing credentials. Respect all .gitignore and .claudeignore entries without exception.
- This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
