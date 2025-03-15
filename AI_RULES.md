# **AI Development Protocol**  
*For error-free GitHub deployments*

### **1. Pre-Commit Validation**
```bash
# REQUIRED CHECKS BEFORE EVERY COMMIT
npm run type-check && npm run lint && npm run build

# Cursor Command Enforcement
/rule: Block commit if any check fails
/rule: Auto-add missing imports from project structure

# REQUIRED FILES CHECKLIST
app/
  components/
    error-boundary.tsx  # Custom error handler
  page.tsx
next.config.js          # Next.js config
public/robots.txt       # Basic SEO


# REQUIRED FILES CHECKLIST
app/
  components/
    error-boundary.tsx  # Custom error handler
  page.tsx
next.config.js          # Next.js config
public/robots.txt       # Basic SEO


# Cursor Command
/check: "Does this component exist? [yes/no/filepath]"

# .github/workflows/deploy.yml CRITICAL RULES
- name: Dependency Integrity
  run: |
    npm ci --audit=false
    git diff --exit-code package*.json
    
- name: Build Validation  
  run: npm run build -- --no-lint --no-type-check

  # When Errors Occur
/diagnose: Full error log analysis
/fix: Rollback to last stable commit (git revert HEAD)
cursor --context .ai_rules.md --learn-error-patterns
# Train with common errors
/learn-error "Module not found: Can't resolve './error-boundary'"
> Solution: Verify component exists in app/components/
1. Never use getStaticProps without revalidate
2. Always include TS types for API routes
3. next/head must be in _app.tsx
4. Validate next.config.js exists
https://nextjs.org/docs/deployment#github-actions
https://cursor.sh/guides/error-prevention
https://docs.github.com/en/actions/debugging

IF ERROR OCCURS:
1. Run /diagnose
2. Execute LOCAL_CI_TEST command
3. If unresolved, revert with /fix rollback

LOCAL_CI_TEST="docker run -v $(pwd):/app node:18-bullseye npm ci && npm build"