// Extracted from docs/htmls/pandav-architecture-v3.html.
// Rendered as trusted local SVG so the React app preserves the v3 diagram fidelity.

export const v3SystemSvg = String.raw`<svg viewBox="0 0 820 540" role="img">
      <defs>
        <marker id="a1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </marker>
      </defs>

      <!-- Entra ID banner -->
      <g class="c-purple"><rect x="320" y="10" width="330" height="24" rx="6" stroke-width="0.5"/></g>
      <text class="th" x="485" y="26" text-anchor="middle">Microsoft Entra ID — Graph API</text>
      <text class="ts" x="485" y="44" text-anchor="middle" fill="#7c3aed">identity resolution</text>

      <!-- TEAMS block -->
      <g class="c-purple"><rect x="14" y="56" width="140" height="186" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="84" y="72" text-anchor="middle" fill="#4338ca" font-weight="600">Microsoft Teams</text>
      <g class="c-gray"><rect x="24" y="82" width="120" height="48" rx="6" stroke-width="0.5"/></g>
      <text class="th" x="84" y="103" text-anchor="middle">Teams client</text>
      <text class="ts" x="84" y="119" text-anchor="middle">Bot Framework SDK</text>
      <g class="c-gray"><rect x="24" y="140" width="120" height="26" rx="5" stroke-width="0.5"/></g>
      <text class="ts" x="84" y="157" text-anchor="middle">"I need write access…"</text>
      <g class="c-gray"><rect x="24" y="176" width="120" height="36" rx="5" stroke-width="0.5"/></g>
      <text class="th" x="84" y="192" text-anchor="middle">Approval card</text>
      <text class="ts" x="84" y="206" text-anchor="middle">Approve / Reject</text>

      <!-- Azure Bot -->
      <g class="c-blue"><rect x="200" y="120" width="106" height="54" rx="8" stroke-width="0.5"/></g>
      <text class="th" x="253" y="144" text-anchor="middle">Azure Bot</text>
      <text class="ts" x="253" y="161" text-anchor="middle">Service</text>
      <line class="fl" x1="154" y1="158" x2="198" y2="158" stroke="#7F77DD" stroke-width="1.2" marker-end="url(#a1)"/>
      <text class="ts" x="176" y="151" text-anchor="middle">message</text>
      <line class="fl" x1="306" y1="147" x2="348" y2="147" stroke="#185FA5" stroke-width="1.3" marker-end="url(#a1)"/>

      <!-- PANDAV CORE -->
      <g class="c-purple"><rect x="352" y="54" width="456" height="210" rx="11" stroke-width="1"/></g>
      <text class="ts" x="580" y="70" text-anchor="middle" fill="#4338ca" font-weight="600">Pandav core</text>
      <g class="c-purple"><rect x="364" y="80" width="432" height="46" rx="7" stroke-width="0.5"/></g>
      <text class="th" x="580" y="99" text-anchor="middle">Agent orchestrator — claude-sonnet-4-6 + tool use API</text>
      <!-- three engine boxes -->
      <g class="c-blue"><rect x="364" y="138" width="134" height="36" rx="6" stroke-width="0.5"/></g>
      <text class="th" x="431" y="153" text-anchor="middle">Policy engine</text>
      <text class="ts" x="431" y="167" text-anchor="middle">eligibility + compliance tier</text>
      <g class="c-amber"><rect x="506" y="138" width="134" height="36" rx="6" stroke-width="0.5"/></g>
      <text class="th" x="573" y="153" text-anchor="middle">Approval engine</text>
      <text class="ts" x="573" y="167" text-anchor="middle">route + escalate</text>
      <g class="c-graph"><rect x="648" y="138" width="140" height="36" rx="6" stroke-width="0.5"/></g>
      <text class="th" x="718" y="153" text-anchor="middle">Graph service</text>
      <text class="ts" x="718" y="167" text-anchor="middle">Neo4j client</text>
      <!-- audit -->
      <g class="c-teal"><rect x="364" y="184" width="432" height="30" rx="5" stroke-width="0.5"/></g>
      <text class="th" x="580" y="197" text-anchor="middle">Pandav audit log — immutable (INSERT only)</text>

      <!-- Pandav → Entra -->
      <line class="flr" x1="510" y1="54" x2="510" y2="36" stroke="#AFA9EC" stroke-width="1.1" marker-end="url(#a1)"/>

      <!-- NEO4J -->
      <g class="c-graph"><rect x="592" y="296" width="188" height="94" rx="9" stroke-width="1"/></g>
      <text class="th" x="686" y="317" text-anchor="middle" fill="#7c3aed">Neo4j — AuraDB</text>
      <text class="ts" x="686" y="333" text-anchor="middle" fill="#6d28d9">Access graph</text>
      <text class="ts" x="686" y="348" text-anchor="middle">Org→BU→Team→Project</text>
      <text class="ts" x="686" y="363" text-anchor="middle">→System→Resource→Role→Grant</text>
      <path class="fls" d="M718 264 L718 294" fill="none" stroke="#7c3aed" stroke-width="1.3" marker-end="url(#a1)"/>
      <text class="ts" x="730" y="281" fill="#7c3aed">traverse / write grant</text>

      <!-- SERVICENOW -->
      <g class="c-coral"><rect x="196" y="296" width="168" height="64" rx="9" stroke-width="1"/></g>
      <text class="th" x="280" y="318" text-anchor="middle">ServiceNow</text>
      <text class="ts" x="280" y="334" text-anchor="middle">sc_req_item · RITM</text>
      <text class="ts" x="280" y="349" text-anchor="middle">ITSM source of truth</text>
      <path class="fl" d="M430 264 L430 328 L366 328" fill="none" stroke="#D85A30" stroke-width="1.3" marker-end="url(#a1)"/>
      <text class="ts" x="386" y="284" text-anchor="middle">create / update</text>
      <path class="fls" d="M364 314 L400 314 L400 264" fill="none" stroke="#D85A30" stroke-width="0.9" marker-end="url(#a1)"/>

      <!-- Integration tools -->
      <text class="ts" x="452" y="280" text-anchor="middle">integration tools</text>
      <g class="c-blue"><rect x="374" y="296" width="50" height="38" rx="6" stroke-width="0.5"/></g><text class="th" x="399" y="313" text-anchor="middle">GitHub</text><text class="ts" x="399" y="327" text-anchor="middle">repos</text>
      <g class="c-blue"><rect x="430" y="296" width="46" height="38" rx="6" stroke-width="0.5"/></g><text class="th" x="453" y="313" text-anchor="middle">Jira</text><text class="ts" x="453" y="327" text-anchor="middle">proj</text>
      <g class="c-blue"><rect x="482" y="296" width="50" height="38" rx="6" stroke-width="0.5"/></g><text class="th" x="507" y="313" text-anchor="middle">Conf.</text><text class="ts" x="507" y="327" text-anchor="middle">spaces</text>
      <g class="c-gray"><rect x="374" y="340" width="50" height="34" rx="6" stroke-width="0.5"/></g><text class="th" x="399" y="355" text-anchor="middle">Azure</text><text class="ts" x="399" y="368" text-anchor="middle">IAM</text>
      <g class="c-gray"><rect x="430" y="340" width="50" height="34" rx="6" stroke-width="0.5"/></g><text class="th" x="455" y="357" text-anchor="middle">K8s</text><text class="ts" x="455" y="369" text-anchor="middle">RBAC</text>
      <g class="c-gray"><rect x="486" y="340" width="46" height="34" rx="6" stroke-width="0.5"/></g><text class="th" x="509" y="357" text-anchor="middle">+more</text><text class="ts" x="509" y="369" text-anchor="middle">stubs</text>

      <!-- Pandav → tools -->
      <line class="fls" x1="400" y1="264" x2="399" y2="294" stroke="#185FA5" stroke-width="0.9" marker-end="url(#a1)"/>
      <line class="fls" x1="440" y1="264" x2="453" y2="294" stroke="#185FA5" stroke-width="0.9" marker-end="url(#a1)"/>
      <line class="fls" x1="490" y1="264" x2="507" y2="294" stroke="#185FA5" stroke-width="0.9" marker-end="url(#a1)"/>

      <!-- Left column: HR, Postgres, Key Vault, Service Bus -->
      <g class="c-teal"><rect x="14" y="296" width="134" height="38" rx="7" stroke-width="0.5"/></g>
      <text class="th" x="81" y="313" text-anchor="middle">HR webhooks</text>
      <text class="ts" x="81" y="327" text-anchor="middle">new-joiner events</text>
      <path class="fls" d="M148 315 L172 315 L172 196 L350 196" fill="none" stroke="#1D9E75" stroke-width="0.9" marker-end="url(#a1)"/>

      <g class="c-gray"><rect x="14" y="344" width="134" height="38" rx="7" stroke-width="0.5"/></g>
      <text class="th" x="81" y="361" text-anchor="middle">PostgreSQL 15</text>
      <text class="ts" x="81" y="375" text-anchor="middle">requests · audit · state</text>
      <path class="fls" d="M148 363 L176 363 L176 220 L350 220" fill="none" stroke="#71717a" stroke-width="0.9" marker-end="url(#a1)"/>

      <g class="c-amber"><rect x="14" y="392" width="134" height="38" rx="7" stroke-width="0.5"/></g>
      <text class="th" x="81" y="409" text-anchor="middle">Azure Key Vault</text>
      <text class="ts" x="81" y="423" text-anchor="middle">all secrets</text>
      <path class="fls" d="M148 411 L180 411 L180 230 L350 230" fill="none" stroke="#b45309" stroke-width="0.9" marker-end="url(#a1)"/>

      <g class="c-gray"><rect x="196" y="374" width="134" height="38" rx="7" stroke-width="0.5"/></g>
      <text class="th" x="263" y="391" text-anchor="middle">Azure Service Bus</text>
      <text class="ts" x="263" y="405" text-anchor="middle">SNOW retry queue</text>

      <!-- Admin portal -->
      <g class="c-amber"><rect x="352" y="402" width="428" height="46" rx="9" stroke-width="0.5"/></g>
      <text class="th" x="566" y="422" text-anchor="middle">Admin portal — Next.js 14</text>
      <text class="ts" x="566" y="438" text-anchor="middle">graph editor · role templates · apps · policies · audit</text>
      <line class="fls" x1="566" y1="400" x2="566" y2="392" stroke="#b45309" stroke-width="0.9" marker-end="url(#a1)"/>
      <path class="fls" d="M686 402 L686 392" fill="none" stroke="#7c3aed" stroke-width="0.9" marker-end="url(#a1)"/>

      <!-- Legend -->
      <rect x="14" y="466" width="550" height="62" rx="7" class="box" stroke-width="0.5"/>
      <text class="ts" x="26" y="482" font-weight="600" fill="#18181b">Legend</text>
      <line x1="26" y1="494" x2="52" y2="494" stroke="#7F77DD" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="58" y="498">Teams flow</text>
      <line x1="26" y1="510" x2="52" y2="510" stroke="#D85A30" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="58" y="514">ServiceNow flow</text>
      <line x1="26" y1="522" x2="52" y2="522" stroke="#71717a" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="58" y="526">data / config</text>
      <line x1="160" y1="494" x2="186" y2="494" stroke="#185FA5" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="192" y="498">provisioning</text>
      <line x1="160" y1="510" x2="186" y2="510" stroke="#AFA9EC" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="192" y="514">identity resolution</text>
      <line x1="160" y1="522" x2="186" y2="522" stroke="#7c3aed" stroke-width="1.1" stroke-dasharray="5 4" marker-end="url(#a1)"/>
      <text class="ts" x="192" y="526">graph traverse / grant</text>
      <rect x="320" y="482" width="9" height="9" rx="2" fill="#ebebff" stroke="#c5c6f5" stroke-width="0.5"/>
      <text class="ts" x="334" y="491">Agent / Teams layer</text>
      <rect x="320" y="498" width="9" height="9" rx="2" fill="#fde8e8" stroke="#fca5a5" stroke-width="0.5"/>
      <text class="ts" x="334" y="507">ServiceNow / grants</text>
      <rect x="320" y="514" width="9" height="9" rx="2" fill="#fdf4ff" stroke="#d8b4fe" stroke-width="0.5"/>
      <text class="ts" x="334" y="523">Neo4j access graph</text>
    </svg>`;

export const v3GraphSvg = String.raw`<svg viewBox="-34 0 784 626" role="img">
      <defs><marker id="ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>

      <!-- Org -->
      <g class="node"><ellipse cx="120" cy="38" rx="78" ry="22" fill="#ebebff" stroke="#c5c6f5" stroke-width="1"/><text class="th" x="120" y="42" text-anchor="middle">Organisation</text></g>
      <line x1="82"  y1="57" x2="54"  y2="100" stroke="#7F77DD" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="40" y="81" fill="#7F77DD">HAS_BU</text>
      <line x1="158" y1="57" x2="228" y2="100" stroke="#7F77DD" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="180" y="81" fill="#7F77DD">HAS_TEAM</text>

      <!-- BusinessUnit -->
      <g class="node"><ellipse cx="44" cy="120" rx="56" ry="22" fill="#ebebff" stroke="#c5c6f5" stroke-width="1"/><text class="th" x="44" y="124" text-anchor="middle">BusinessUnit</text></g>
      <text class="ts" x="2" y="156" fill="#52525b">compliance_tier</text>
      <path d="M100 120 Q170 120 186 120" fill="none" stroke="#7F77DD" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="126" y="113" fill="#7F77DD">HAS_TEAM</text>

      <!-- Team -->
      <g class="node"><ellipse cx="236" cy="120" rx="52" ry="22" fill="#ebebff" stroke="#c5c6f5" stroke-width="1"/><text class="th" x="236" y="124" text-anchor="middle">Team</text></g>
      <line x1="236" y1="142" x2="236" y2="172" stroke="#7F77DD" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="244" y="160" fill="#7F77DD">RUNS_PROJECT</text>
      <path d="M288 120 L352 166" fill="none" stroke="#BA7517" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="296" y="140" fill="#BA7517">HAS_TEMPLATE</text>

      <!-- Project -->
      <g class="node"><ellipse cx="236" cy="194" rx="52" ry="22" fill="#ebebff" stroke="#c5c6f5" stroke-width="1"/><text class="th" x="236" y="198" text-anchor="middle">Project</text></g>
      <path d="M288 194 L352 188" fill="none" stroke="#BA7517" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="294" y="186" fill="#BA7517">REQUIRES</text>

      <!-- Person -->
      <g class="node"><ellipse cx="46" cy="284" rx="58" ry="26" fill="#d1fae5" stroke="#6ee7b7" stroke-width="1"/><text class="th" x="46" y="282" text-anchor="middle">Person</text><text class="ts" x="46" y="298" text-anchor="middle">Entra identity</text></g>
      <path d="M14 264 Q-6 264 -6 244 Q-6 232 14 248" fill="none" stroke="#1D9E75" stroke-width="0.8" stroke-dasharray="3 3" marker-end="url(#ag)"/>
      <text class="ts" x="-16" y="246" fill="#1D9E75">REPORTS_TO</text>
      <path d="M104 276 Q180 220 184 142" fill="none" stroke="#1D9E75" stroke-width="1" stroke-dasharray="5 3" marker-end="url(#ag)"/>
      <text class="ts" x="130" y="210" fill="#1D9E75">MEMBER_OF</text>
      <path d="M104 286 Q180 260 184 212" fill="none" stroke="#1D9E75" stroke-width="1" stroke-dasharray="5 3" marker-end="url(#ag)"/>
      <text class="ts" x="112" y="262" fill="#1D9E75">ASSIGNED_TO</text>
      <path d="M46 310 Q46 382 100 400 Q158 420 214 412" fill="none" stroke="#BA7517" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="48" y="364" fill="#BA7517">IS_APPROVER_FOR</text>
      <line x1="46" y1="310" x2="76" y2="474" stroke="#D85A30" stroke-width="1.2" marker-end="url(#ag)"/>
      <text class="ts" x="46" y="400" fill="#D85A30">HAS_GRANT</text>

      <!-- AccessTemplate -->
      <g class="node"><ellipse cx="394" cy="186" rx="70" ry="26" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/><text class="th" x="394" y="184" text-anchor="middle">AccessTemplate</text><text class="ts" x="394" y="200" text-anchor="middle">reusable kit</text></g>
      <line x1="464" y1="198" x2="514" y2="248" stroke="#BA7517" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="472" y="226" fill="#BA7517">INCLUDES</text>
      <path d="M464 192 L516 196 L516 318" fill="none" stroke="#BA7517" stroke-width="0.8" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="476" y="188" fill="#BA7517">AT_ROLE</text>

      <!-- System -->
      <g class="node"><ellipse cx="566" cy="148" rx="68" ry="26" fill="#e8f4ff" stroke="#93c5fd" stroke-width="1"/><text class="th" x="566" y="146" text-anchor="middle">System</text><text class="ts" x="566" y="162" text-anchor="middle">GitHub · K8s · Databricks</text></g>
      <line x1="566" y1="174" x2="566" y2="240" stroke="#185FA5" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="576" y="210" fill="#185FA5">HAS_RESOURCE</text>

      <!-- Resource -->
      <g class="node"><ellipse cx="566" cy="262" rx="68" ry="26" fill="#e8f4ff" stroke="#93c5fd" stroke-width="1"/><text class="th" x="566" y="260" text-anchor="middle">Resource</text><text class="ts" x="566" y="276" text-anchor="middle">repo · cluster · NS</text></g>
      <line x1="566" y1="288" x2="566" y2="320" stroke="#185FA5" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="576" y="307" fill="#185FA5">ACCEPTS_ROLE</text>
      <path d="M502 268 Q438 268 390 368" fill="none" stroke="#BA7517" stroke-width="0.9" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="422" y="306" fill="#BA7517">GOVERNED_BY</text>

      <!-- Role -->
      <g class="node"><ellipse cx="566" cy="344" rx="52" ry="22" fill="#e8f4ff" stroke="#93c5fd" stroke-width="1"/><text class="th" x="566" y="348" text-anchor="middle">Role</text></g>

      <!-- ApprovalPolicy -->
      <g class="node"><ellipse cx="350" cy="382" rx="78" ry="26" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/><text class="th" x="350" y="380" text-anchor="middle">ApprovalPolicy</text><text class="ts" x="350" y="396" text-anchor="middle">auto · manager · IT admin</text></g>

      <!-- AccessGrant -->
      <g class="node"><ellipse cx="120" cy="490" rx="72" ry="26" fill="#fde8e8" stroke="#fca5a5" stroke-width="1"/><text class="th" x="120" y="488" text-anchor="middle">AccessGrant</text><text class="ts" x="120" y="504" text-anchor="middle">live access</text></g>
      <path d="M192 490 Q400 500 502 300 L528 278" fill="none" stroke="#D85A30" stroke-width="1" marker-end="url(#ag)"/>
      <text class="ts" x="320" y="516" fill="#D85A30">GRANTS_ACCESS_TO</text>
      <path d="M48 490 Q20 490 20 394 Q20 302 28 292" fill="none" stroke="#D85A30" stroke-width="0.8" stroke-dasharray="4 3" marker-end="url(#ag)"/>
      <text class="ts" x="-4" y="388" fill="#D85A30">APPROVED_BY</text>
      <line x1="192" y1="492" x2="250" y2="492" stroke="#D85A30" stroke-width="1.2" marker-end="url(#ag)"/>
      <text class="ts" x="196" y="484" fill="#D85A30">RECORDED_IN</text>

      <!-- ServiceNowRecord -->
      <g class="node"><ellipse cx="344" cy="492" rx="82" ry="26" fill="#fde8e8" stroke="#fca5a5" stroke-width="1"/><text class="th" x="344" y="490" text-anchor="middle">ServiceNowRecord</text><text class="ts" x="344" y="506" text-anchor="middle">RITM · source of truth</text></g>

      <!-- Blast radius box -->
      <rect x="20" y="548" width="700" height="40" rx="7" fill="#fdf4ff" stroke="#d8b4fe" stroke-width="0.5"/>
      <text class="th" x="370" y="564" text-anchor="middle" fill="#7c3aed">Blast radius query &lt;10ms: MATCH (g:AccessGrant)-[:GRANTS_ACCESS_TO]-&gt;(r:Resource{slug:'payments-k8s'})</text>
      <text class="ts" x="370" y="580" text-anchor="middle" fill="#6d28d9">&lt;-[:HAS_GRANT]-(p:Person) WHERE g.revoked_at IS NULL RETURN p.display_name, g.snow_ticket</text>

      <text class="ts" x="370" y="614" text-anchor="middle" style="opacity:.4">Click any node to see properties and example Cypher</text>
    </svg>`;

export const v3LayersSvg = String.raw`<svg viewBox="0 0 720 540" role="img">
      <defs><marker id="al" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>

      <!-- Layer 1 -->
      <g class="c-purple"><rect x="18" y="16" width="684" height="60" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="360" y="33" text-anchor="middle" fill="#4338ca" font-weight="600">Interaction layer</text>
      <g class="c-purple"><rect x="30" y="42" width="296" height="22" rx="5" stroke-width="0.5"/></g>
      <text class="th" x="178" y="53" text-anchor="middle">Microsoft Teams — Pandav chat bot</text>
      <g class="c-purple"><rect x="336" y="42" width="354" height="22" rx="5" stroke-width="0.5"/></g>
      <text class="th" x="513" y="53" text-anchor="middle">Admin Portal — Next.js 14 (Graph Explorer)</text>
      <line x1="360" y1="76" x2="360" y2="90" stroke="var(--t2)" stroke-width="0.8" marker-end="url(#al)"/>

      <!-- Layer 2 -->
      <g class="c-blue"><rect x="18" y="90" width="684" height="52" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="360" y="107" text-anchor="middle" fill="#185FA5" font-weight="600">API layer</text>
      <text class="th" x="360" y="128" text-anchor="middle">Pandav API — FastAPI (Python 3.11)</text>
      <line x1="360" y1="142" x2="360" y2="156" stroke="var(--t2)" stroke-width="0.8" marker-end="url(#al)"/>

      <!-- Layer 3 -->
      <g class="c-teal"><rect x="18" y="156" width="684" height="52" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="360" y="173" text-anchor="middle" fill="#0f766e" font-weight="600">Agent layer</text>
      <text class="th" x="360" y="194" text-anchor="middle">Agent Orchestrator — claude-sonnet-4-6 + tool use API</text>
      <line x1="360" y1="208" x2="360" y2="222" stroke="var(--t2)" stroke-width="0.8" marker-end="url(#al)"/>

      <!-- Layer 4: Tools -->
      <g class="c-amber"><rect x="18" y="222" width="684" height="62" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="360" y="238" text-anchor="middle" fill="#b45309" font-weight="600">Tool layer</text>
      <g class="c-amber"><rect x="30"  y="246" width="88"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="74"  y="257" text-anchor="middle">traverse_graph</text>
      <g class="c-amber"><rect x="126" y="246" width="82"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="167" y="257" text-anchor="middle">check_policy</text>
      <g class="c-amber"><rect x="216" y="246" width="82"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="257" y="257" text-anchor="middle">create_snow</text>
      <g class="c-amber"><rect x="306" y="246" width="88"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="350" y="257" text-anchor="middle">send_approval</text>
      <g class="c-amber"><rect x="402" y="246" width="80"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="442" y="257" text-anchor="middle">provision_*</text>
      <g class="c-amber"><rect x="490" y="246" width="82"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="531" y="257" text-anchor="middle">write_grant</text>
      <g class="c-amber"><rect x="580" y="246" width="80"  height="22" rx="4" stroke-width="0.5"/></g><text class="th" x="620" y="257" text-anchor="middle">audit_write</text>

      <!-- Arrows down to data -->
      <line x1="110" y1="284" x2="90"  y2="316" stroke="var(--t2)" stroke-width="0.7" marker-end="url(#al)"/>
      <line x1="270" y1="284" x2="310" y2="316" stroke="var(--t2)" stroke-width="0.7" marker-end="url(#al)"/>
      <line x1="450" y1="284" x2="500" y2="316" stroke="var(--t2)" stroke-width="0.7" marker-end="url(#al)"/>
      <line x1="570" y1="284" x2="570" y2="316" stroke="var(--t2)" stroke-width="0.7" marker-end="url(#al)"/>

      <!-- Layer 5: Data stores -->
      <g class="c-graph"><rect x="18"  y="316" width="214" height="60" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="125" y="334" text-anchor="middle" fill="#7c3aed" font-weight="600">Access graph</text>
      <text class="th" x="125" y="356" text-anchor="middle">Neo4j — AuraDB</text>

      <g class="c-gray"><rect x="242" y="316" width="214" height="60" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="349" y="334" text-anchor="middle" fill="#52525b" font-weight="600">Transactional store</text>
      <text class="th" x="349" y="356" text-anchor="middle">PostgreSQL 15</text>

      <g class="c-coral"><rect x="466" y="316" width="236" height="60" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="584" y="334" text-anchor="middle" fill="#D85A30" font-weight="600">ITSM — source of truth</text>
      <text class="th" x="584" y="356" text-anchor="middle">ServiceNow</text>

      <line x1="360" y1="376" x2="360" y2="390" stroke="var(--t2)" stroke-width="0.8" marker-end="url(#al)"/>

      <!-- Layer 6: Provisioning APIs -->
      <g class="c-blue"><rect x="18" y="390" width="684" height="100" rx="9" stroke-width="0.5"/></g>
      <text class="ts" x="360" y="408" text-anchor="middle" fill="#185FA5" font-weight="600">Provisioning APIs</text>
      <g class="c-blue"><rect x="30"  y="416" width="96"  height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="78"  y="442" text-anchor="middle">GitHub</text><text class="ts" x="78"  y="458" text-anchor="middle">org / repos</text>
      <g class="c-blue"><rect x="134" y="416" width="96"  height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="182" y="442" text-anchor="middle">Jira / Conf.</text><text class="ts" x="182" y="458" text-anchor="middle">projects</text>
      <g class="c-blue"><rect x="238" y="416" width="96"  height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="286" y="442" text-anchor="middle">Azure IAM</text><text class="ts" x="286" y="458" text-anchor="middle">RBAC / subs</text>
      <g class="c-blue"><rect x="342" y="416" width="96"  height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="390" y="442" text-anchor="middle">Databricks</text><text class="ts" x="390" y="458" text-anchor="middle">workspaces</text>
      <g class="c-blue"><rect x="446" y="416" width="96"  height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="494" y="442" text-anchor="middle">Kubernetes</text><text class="ts" x="494" y="458" text-anchor="middle">RBAC / NS</text>
      <g class="c-blue"><rect x="550" y="416" width="140" height="58" rx="6" stroke-width="0.5"/></g><text class="th" x="620" y="442" text-anchor="middle">Salesforce</text><text class="ts" x="620" y="458" text-anchor="middle">+ MuleSoft + any new</text>

      <text class="ts" x="360" y="524" text-anchor="middle" style="opacity:.5">Any system added via Admin Portal Graph Editor is immediately provisionable — no code deploy</text>
    </svg>`;
