import ProfileAvatar from "./ProfileAvatar";

export default function Perfil({ userDoc }) {
  return (
    <div className="flex flex-col items-center">
      <ProfileAvatar userDoc={userDoc} />
      <h1 className="text-xl font-bold mt-4">{}</h1>
    </div>
  );
}
