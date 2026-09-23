import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Reveal, Section } from "./primitives";

const COMMERCIAL_ACCESS_KEY = "pandora-commercial-access";
const COMMERCIAL_ACCESS_CODE = "TSF2027";

function readAccess() {
  return typeof window !== "undefined" && window.sessionStorage.getItem(COMMERCIAL_ACCESS_KEY) === "granted";
}

export function useCommercialAccess() {
  const [unlocked, setUnlocked] = useState(readAccess);

  useEffect(() => {
    const sync = () => setUnlocked(readAccess());
    window.addEventListener("storage", sync);
    window.addEventListener("commercial-access-granted", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("commercial-access-granted", sync);
    };
  }, []);

  const unlock = (code: string) => {
    const passed = code.trim() === COMMERCIAL_ACCESS_CODE;
    if (!passed) return false;
    window.sessionStorage.setItem(COMMERCIAL_ACCESS_KEY, "granted");
    window.dispatchEvent(new Event("commercial-access-granted"));
    setUnlocked(true);
    return true;
  };

  return { unlocked, unlock };
}

export function CommercialAccessPanel({
  mode = "section",
  onUnlocked
}: {
  mode?: "section" | "presentation";
  onUnlocked?: () => void;
}) {
  const { unlock } = useCommercialAccess();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (unlock(code)) {
      setCode("");
      setError(false);
      onUnlocked?.();
      return;
    }
    setError(true);
  };

  return (
    <Reveal className={`commercial-lock-panel ${mode}`}>
      <div className="commercial-lock-icon">
        <LockKeyhole size={22} aria-hidden="true" />
      </div>
      <div className="commercial-lock-copy">
        <span>Restricted commercial content</span>
        <strong>Commercials are hidden until the presenter unlocks them.</strong>
        <p>
          Use the commercial password only when the discussion needs pricing, rate cards, discount levers or customer ask
          capacity.
        </p>
      </div>
      <form className="commercial-lock-form" onSubmit={submit}>
        <label>
          <span>Commercial password</span>
          <input
            type="password"
            value={code}
            autoComplete="off"
            onChange={(event) => {
              setCode(event.currentTarget.value);
              setError(false);
            }}
            aria-invalid={error}
          />
        </label>
        <button type="submit">
          <ShieldCheck size={15} aria-hidden="true" />
          Unlock
        </button>
        {error ? <em>Incorrect password.</em> : null}
      </form>
    </Reveal>
  );
}

export function ProtectedCommercialsSection({ children }: { children: ReactNode }) {
  const { unlocked } = useCommercialAccess();
  if (unlocked) return <>{children}</>;

  return (
    <Section id="commercials" num="16" title="Commercials - restricted access">
      <CommercialAccessPanel />
    </Section>
  );
}
