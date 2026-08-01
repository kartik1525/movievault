import { useState } from 'react';
import { AnimatedPage } from '@/components/common/animated-page';
import { PageHeader } from '@/components/common/page-header';
import { useAuth } from '@/context/auth-context';
import { updateUserDisplayName } from '@/services/auth-service';
import { User, CheckCircle, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setIsSaving(true);
    setSuccess(false);
    try {
      await updateUserDisplayName(displayName.trim());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      // Ignore error
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="page-container pt-28 pb-16 space-y-8 max-w-3xl">
        <PageHeader
          title="Account Settings"
          description="Manage your profile, preferences, and display settings."
        />

        <div className="bg-cv-surface border border-cv-border rounded-2xl p-8 shadow-2xl space-y-6">
          <h2 className="text-h3 text-cv-text flex items-center gap-2 border-b border-cv-border pb-4">
            <User className="w-5 h-5 text-cv-accent" />
            Profile Preferences
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            {success && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-cv-success-muted border border-cv-success/30 text-cv-success text-xs font-medium">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-cv-text-secondary">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-cv-card border border-cv-border rounded-xl text-sm text-cv-text focus:outline-none focus:border-cv-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-cv-text-secondary">Email Address</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 bg-cv-card/50 border border-cv-border rounded-xl text-sm text-cv-text-tertiary cursor-not-allowed"
              />
              <p className="text-[11px] text-cv-text-tertiary">Email address cannot be modified directly.</p>
            </div>

            <button
              type="submit"
              disabled={isSaving || !user}
              className="px-6 py-3 bg-cv-accent text-white text-sm font-semibold rounded-xl hover:bg-cv-accent-hover transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}
