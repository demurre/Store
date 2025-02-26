import { useState, useEffect } from "react";
import { supaClient } from "../../config/supa-client";
import styles from "./Profile.module.css";
import Button from "../../components/Button/Button";
import {
  faUser,
  faEnvelope,
  faUpload,
  faSave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "../../hooks/useSession";
import Headling from "../Headling/Headling";

export function Profile() {
  const { session, profile, isLoading, refreshProfile } = useSession();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameChecking, setUsernameChecking] = useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setEmail(profile.email || "");
      setProfileImage(profile.image || null);
    }
  }, [profile]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !session?.user.id) {
      return;
    }

    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `images/${session.user.id}/${fileName}`;

      const { error: uploadError } = await supaClient.storage
        .from("user_profiles")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: urlData } = supaClient.storage
        .from("user_profiles")
        .getPublicUrl(filePath);

      setProfileImage(urlData.publicUrl);
      setMessage({ type: "success", text: "Image uploaded successfully" });
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage({
        type: "error",
        text: "Error uploading image. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const checkUsernameAvailability = async (username: string) => {
    if (!username || (profile && profile.username === username)) {
      setUsernameAvailable(true);
      return true;
    }

    setUsernameChecking(true);

    try {
      const { data, error } = await supaClient
        .from("profile")
        .select("username")
        .eq("username", username)
        .neq("id", session?.user.id || "");

      const isAvailable = !error && (!data || data.length === 0);
      setUsernameAvailable(isAvailable);
      return isAvailable;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    } finally {
      setUsernameChecking(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(newUsername);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const updateProfile = async () => {
    if (!session?.user.id) return;

    if (username.trim() === "") {
      setMessage({ type: "error", text: "Username cannot be empty" });
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    const isUsernameValid = await checkUsernameAvailability(username);
    if (!isUsernameValid) {
      setMessage({ type: "error", text: "Username is already taken" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const { error: profileError } = await supaClient
        .from("profile")
        .update({
          username,
          image: profileImage,
        })
        .eq("id", session.user.id);

      if (profileError) throw profileError;

      if (email !== profile?.email) {
        const { error: emailError } = await supaClient.auth.updateUser({
          email,
        });

        if (emailError) throw emailError;
      }

      if (newPassword) {
        const { error: passwordError } = await supaClient.auth.updateUser({
          password: newPassword,
        });

        if (passwordError) throw passwordError;

        setNewPassword("");
        setConfirmPassword("");
      }

      setMessage({ type: "success", text: "Profile updated successfully" });

      // Refresh the profile data
      await refreshProfile();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error.message || "Error updating profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles["loading"]}>
        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        <p>Loading profile...</p>
      </div>
    );
  }

  const avatarUrl =
    profileImage ||
    (username
      ? `https://ui-avatars.com/api/?name=${username
          .charAt(0)
          .toUpperCase()}&background=random&color=fff&size=256`
      : `https://ui-avatars.com/api/?name=${
          session?.user?.email?.charAt(0).toUpperCase() || "U"
        }&background=random&color=fff&size=256`);

  return (
    <div className={styles["profile-container"]}>
      <Headling className={styles["headling"]}>Profile settings</Headling>

      {message && (
        <div className={styles[`message-${message.type}`]}>{message.text}</div>
      )}

      <div className={styles["profile-grid"]}>
        <div className={styles["avatar-section"]}>
          <div className={styles["avatar-container"]}>
            <img src={avatarUrl} alt="Profile" className={styles["avatar"]} />
            {uploading && (
              <div className={styles["upload-overlay"]}>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            )}
          </div>

          <label className={styles["upload-button"]}>
            <FontAwesomeIcon icon={faUpload} /> Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div className={styles["form-section"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Username
            </label>
            <div className={styles["input-group"]}>
              <input
                id="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className={`${styles["input"]} ${
                  !usernameAvailable ? styles["input-error"] : ""
                }`}
              />
              {usernameChecking && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className={styles["input-icon"]}
                />
              )}
            </div>
            {!usernameAvailable && (
              <div className={styles["input-feedback"]}>
                Username is already taken
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["input"]}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="newPassword">
              New Password (leave blank to keep current)
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles["input"]}
              placeholder="New password"
            />
          </div>

          {newPassword && (
            <div className={styles["form-group"]}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`${styles["input"]} ${
                  confirmPassword && newPassword !== confirmPassword
                    ? styles["input-error"]
                    : ""
                }`}
                placeholder="Confirm new password"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <div className={styles["input-feedback"]}>
                  Passwords do not match
                </div>
              )}
            </div>
          )}

          <Button
            onClick={updateProfile}
            disabled={saving || uploading || !usernameAvailable}
            className={styles["save-button"]}
          >
            {saving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
