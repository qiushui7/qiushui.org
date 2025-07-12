"use client";

import ProfileCard from "@/app/components/profile-card/index";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="mx-auto w-4xl">
        <ProfileCard
          avatarUrl="/id-photo-no-bg.png"
          iconUrl="/iconpattern.png"
          grainUrl="/grain.webp"
          behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(266, 100%, 90%, var(--card-opacity)) 4%, hsl(266deg 13.26% 3.91%) 10%, hsla(266, 25%, 70%, calc(var(--card-opacity) * 0.5)) 50%, hsla(266, 0%, 60%, 0) 100%), radial-gradient(35% 52% at 55% 20%, #00ffaac4 0%, #073aff00 100%), radial-gradient(100% 100% at 50% 50%, #012632 1%, #073aff00 76%), conic-gradient(from 124deg at 50% 50%, #09020c 0%, #07c6ffff 40%, #000a0c 60%, #0b030e 100%);"
          name="Benjamin"
          title="Software Engineer"
          handle="benjamin"
          status="Online"
          showUserInfo={true}
          enableTilt={true}
        />
      </div>
    </div>
  );
}