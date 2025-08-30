import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "./apiUtils";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../assets/store/userSlice";

export const useSettings = () => {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleName, setToggleName] = useState(false);
  const [toggleEmail, setToggleEmail] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [emailCodeCont, setEmailCodeCont] = useState(false);

  const [name, setName] = useState({
    firstname: user.firstname,
    lastname: user.lastname || "",
    email: user.email,
  });
  const [email, setEmail] = useState({ email: user.email });
  const [emailCode, setEmailCode] = useState({
    code: "",
    oldEmail: user.email,
    newEmail: "",
  });
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState({});

  const handleNameChange = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, name: true });
    const data = await apiCall(
      "name/change",
      name,
      "Updating your name...",
      "Name updated successfully!"
    );
    if (data) {
      setToggleName(false);
      dispatch(
        updateUser({
          ...user,
          firstname: data.firstname,
          lastname: data.lastname || "",
        })
      );
      navigate(0);
    }
    setIsLoading({ ...isLoading, name: false });
  };

  const handleSendEmailCode = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, email: true });
    const data = await apiCall(
      "email/change/verify",
      email,
      "Sending verification code...",
      "Verification code sent. Check your inbox!"
    );
    if (data) {
      setEmailCode((prev) => ({ ...prev, newEmail: data.email }));
      setEmailCodeCont(true);
    }
    setIsLoading({ ...isLoading, email: false });
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, emailCode: true });
    const data = await apiCall(
      "email/change",
      emailCode,
      "Verifying code...",
      "Email address updated successfully!"
    );
    if (data) {
      setEmailCodeCont(false);
      setEmailCode({ code: "", oldEmail: data.email, newEmail: "" });
      setToggleEmail(false);
      setEmail({ email: data.email });
      setName((prevName) => ({ ...prevName, email: data.email }));
      dispatch(updateUser(data.admin));
    }
    setIsLoading({ ...isLoading, emailCode: false });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, password: true });

    const payload = {
      email: emailCode.oldEmail,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
    };

    const data = await apiCall(
      "password/change",
      payload,
      "Updating your password...",
      "Password updated successfully!"
    );

    if (data) {
      setTogglePassword(false);
      setPassword({ newPassword: "", confirmPassword: "" });
    }
    setIsLoading({ ...isLoading, password: false });
  };

  const handleAccountDeletion = async () => {
    setIsLoading({ ...isLoading, delete: true });

    const payload = { userId: user._id };

    const data = await apiCall(
      "delete-account",
      payload,
      "Deleting account...",
      "Account deleted successfully!"
    );

    if (data) {
      dispatch(updateUser(null));
      navigate("/login");
    }
    setIsLoading({ ...isLoading, delete: false });
  };
  const handleProfilePhotoUpload = async (file) => {
    setIsLoading((s) => ({ ...s, photo: true }));
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("email", emailCode.oldEmail);

      const customConfig = {};

      const data = await apiCall(
        "upload-avatar",
        formData,
        "Uploading profile photo...",
        "Profile photo uploaded successfully!",
        "Failed to upload profile photo",
        customConfig
      );

      if (data) {
        dispatch(updateUser(data.admin));
        navigate(0);
      }
    } finally {
      setIsLoading((s) => ({ ...s, photo: false }));
    }
  };
  return {
    // Toggles
    toggleName,
    setToggleName,
    toggleEmail,
    setToggleEmail,
    togglePassword,
    setTogglePassword,
    toggleDelete,
    setToggleDelete,
    emailCodeCont,
    setEmailCodeCont,
    // Form data
    name,
    setName,
    email,
    setEmail,
    emailCode,
    setEmailCode,
    password,
    setPassword,
    // Loading state
    isLoading,
    // Handlers
    handleNameChange,
    handleSendEmailCode,
    handleEmailChange,
    handlePasswordChange,
    handleAccountDeletion,
    handleProfilePhotoUpload,
  };
};
