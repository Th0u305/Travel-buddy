"use client";
import { Button } from "@/src/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/src/components/ui/input-group";
import { Switch } from "@/src/components/ui/switch";
import {
  Bell,
  CircleCheck,
  EarthIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LucidePhone,
  Shield,
  ShieldCog,
  StarIcon,
  Users2Icon,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useUpdatePassword } from "@/src/tanstack/useMutation";
import { toast } from "sonner";
import { useUserStore } from "@/src/store/zustand.store";

export default function SettingsPage() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { updatePasswordMutate, isPending } = useUpdatePassword();
  const {userFullProfile} = useUserStore()

  const canUpdatePassword = userFullProfile?.is_password === false && userFullProfile?.providers?.toString().includes("google");

  const handleUpdatePassword = () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    updatePasswordMutate({ password: newPassword }, {
      onSuccess: () => {
        setPassword("");
        setNewPassword("");
      }
    });
  }

  return (
    <main className="pt-24 pb-32 px-6 max-w-6xl mx-auto">
      {/* Settings Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-on-surface-variant max-w-xl">
          Customize your exploration experience and manage your account
          preferences.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Side Navigation (Web) / Category Selector */}
        <aside className="hidden lg:block lg:col-span-3">
          <nav className="sticky top-28 space-y-2">
            <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 transition-all font-medium">
              <Shield className="fill-yellow-500 stroke-yellow-500" />
              Account Security
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-surface-container-high transition-all text-on-surface-variant">
              <Bell className="fill-cyan-500 stroke-cyan-500" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-surface-container-high transition-all text-on-surface-variant">
              <ShieldCog className="fill-indigo-500 stroke-indigo-500" />
              Privacy &amp; Safety
            </button>
            <button className="w-full flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-surface-container-high transition-all text-on-surface-variant">
              <Wallet className="fill-purple-500 stroke-purple-500" />
              Subscription
            </button>
          </nav>
        </aside>
        {/* Main Settings Canvas */}
        <div className="lg:col-span-9 space-y-12">
          {/* Account Security Section */}
          <section
            className="bg-[#f4f5f0] rounded-3xl p-8 relative overflow-hidden"
            id="security"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <span className="material-symbols-outlined text-9xl">
                security
              </span>
            </div>
            <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3">
              <LockIcon className="fill-green-500 stroke-green-500" />
              Account Security
            </h2>

            {!canUpdatePassword && (
              <div className="bg-yellow-100 border border-yellow-300 text-red-800 p-4 mb-6 rounded-xl text-sm">
                <strong>Caution:</strong> Your account was created via social login. You cannot update a password from here.
              </div>
            )}

            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant ml-1">
                    Current Password
                  </label>
                  <InputGroup className="h-10 bg-[#dee3dc]">
                    <InputGroupInput
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="h-10 "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={!canUpdatePassword}
                    />
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer "
                    >
                      {!showPass && (
                        <EyeOffIcon onClick={() => setShowPass(!showPass)} />
                      )}
                      {showPass && (
                        <EyeIcon onClick={() => setShowPass(!showPass)} />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-on-surface-variant ml-1">
                    New Password
                  </label>
                  <InputGroup className="h-10 bg-[#dee3dc]">
                    <InputGroupInput
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      className="h-10"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      disabled={!canUpdatePassword}
                    />
                    <InputGroupAddon
                      align="inline-end"
                      className="cursor-pointer"
                    >
                      {!showPass && (
                        <EyeOffIcon onClick={() => setShowPass(!showPass)} />
                      )}
                      {showPass && (
                        <EyeIcon onClick={() => setShowPass(!showPass)} />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <Button onClick={handleUpdatePassword} disabled={isPending || !canUpdatePassword} size="lg" variant="default" className="col-span-2 active:scale-95 transition-all w-70 mx-auto">
                    {isPending ? "Updating..." : "Update Password"}
                </Button>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between group">
                <div className="flex items-start gap-4">
                  <div className="bg-accent text-on-secondary-container p-3 rounded-xl">
                    <LucidePhone />
                  </div>
                  <div>
                    <h4 className="font-bold">Two-Factor Authentication</h4>
                    <p className="text-sm text-on-surface-variant">
                      Secure your account with a secondary verification method.
                    </p>
                  </div>
                </div>
                <button className="bg-primary text-white px-6 py-2 rounded-full font-medium active:scale-95 duration-200 transition-all">
                  Enable
                </button>
              </div>
            </div>
          </section>
          {/* Notifications Section */}
          <section className="bg-[#f4f5f0] rounded-3xl p-8" id="notifications">
            <h2 className="text-2xl font-headline font-bold mb-8 flex items-center gap-3">
              <Bell className="fill-cyan-500 stroke-cyan-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest rounded-xl p-5 flex items-center justify-between bg-white">
                <div>
                  <h4 className="font-bold">Push Notifications</h4>
                  <p className="text-sm text-on-surface-variant">
                    Alerts for mentions, journey updates, and messages.
                  </p>
                </div>
                <Switch className="data-unchecked:bg-red-400" />
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-5 flex items-center justify-between bg-white">
                <div>
                  <h4 className="font-bold">Email Digest</h4>
                  <p className="text-sm text-on-surface-variant">
                    Weekly recap of trending destinations and stories.
                  </p>
                </div>
                <Switch className="data-unchecked:bg-red-400" />
              </div>
            </div>
          </section>
          {/* Privacy Bento */}
          <section
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            id="privacy"
          >
            <div className="bg-surface-container-low rounded-3xl p-8 bg-[#dee3dc]">
              <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-3">
                <EyeIcon className="stroke-primary" />
                Visibility
              </h2>
              <p className="text-on-surface-variant text-sm mb-6">
                Choose who can view your travel journal and past journeys.
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white cursor-pointer border-2 border-primary-container">
                  <EarthIcon className="stroke-green-500" />
                  <span className="flex-1 font-medium">Public</span>
                  <CircleCheck className="stroke-yellow-500" />
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white cursor-pointer transition-colors border-2 border-transparent">
                  <Users2Icon className="fill-cyan-500 stroke-cyan-500" />
                  <span className="flex-1 font-medium">Followers Only</span>
                </label>
              </div>
            </div>
            <div className="bg-primary text-white rounded-3xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-2xl font-headline font-bold mb-4">
                  Incognito Mode
                </h2>
                <p className="text-secondary-fixed opacity-90 text-sm mb-8">
                  Browse the map and profiles without leaving a trace of your
                  activity.
                </p>
                <button className="bg-white text-primary px-6 py-2 rounded-full font-bold active:scale-95 duration-200">
                  Go Stealth
                </button>
              </div>
              <span className="absolute bottom-4 right-4 opacity-40">
                <EyeOffIcon className="w-20 h-20" />
              </span>
            </div>
          </section>
          {/* Subscription Card */}
          <section
            className="bg-secondary/60 rounded-3xl border-0 p-8"
            id="subscription"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-primary rounded-2xl p-4 text-white">
                  <StarIcon className="fill-white stroke-white w-10 h-10" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-headline font-extrabold text-tertiary">
                      Explorer Pro
                    </h2>
                    <span className="bg-primary text-white text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-on-tertiary-container font-medium">
                    Renews on Oct 12, 2024 • $14.99/mo
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" variant="default" className="bg-accent border-0 outline-0 text-black rounded-full hover:scale-105 active:scale-100 transition-all hover:text-white">
                  Change Plan
                </Button>
                <Button size="lg" className="bg-white border-0 outline-0 text-black rounded-full hover:scale-105 active:scale-100 transition-all hover:text-white" variant={"default"}>Manage</Button>
              </div>
            </div>
          </section>
          {/* Bottom Action Bar (Contextual) */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <Button size="lg" variant="default" className="bg-white border-0 outline-0 text-black rounded-full hover:scale-105 active:scale-100 transition-all hover:text-white" >
              Discard Changes
            </Button>
            <Button size="lg" variant="default" className="bg-primary border-0 outline-0 text-white rounded-full hover:scale-105 active:scale-100 transition-all" >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
