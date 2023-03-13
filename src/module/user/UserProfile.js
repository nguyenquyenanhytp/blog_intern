import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const { uid } = useParams();
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  const { userInfo } = useAuth();
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    // if (userInfo?.role !== userRole.ADMIN) {
    //   Swal.fire("Failed", "You have no right to do this action", "warning");
    //   return;
    // }
    try {
      const colRef = doc(db, "users", uid);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Update user information successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Update user failed!");
    }
  };

  async function deleteAvatar() {
    const colRef = doc(db, "users", uid);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      if (!uid) return;
      const colRef = doc(db, "users", uid);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
    }
    fetchData();
  }, [uid, reset]);

  if (!uid) return null;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="text-center mb-10">
          <ImageUpload
            className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            image={image}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button type="submit" kind="primary" className="mx-auto w-[200px]">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
