import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import FormInput from "@/components/custom/form/FormInput"
import { useToast } from "@/components/ui/use-toast"

import { graphqlError } from "@/utils/error"
import { loginUser } from "@/apis/user"
import { useGlobalContext } from "@/utils/reducer"
import { graphQLClient } from "@/apis/common"

export default function Login() {
  const { dispatch } = useGlobalContext()

  const userMutation = useMutation({
    mutationFn: (variables) => {
      return loginUser(variables)
    },
  })

  const { toast } = useToast()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      const loginResp = await userMutation.mutateAsync(values)
      const errors = graphqlError(loginResp)
      if (errors) {
        toast({
          title: errors,
        })
      } else {
        const loginData = loginResp?.data?.login
        const token = loginData?.token
        const user = loginData?.user
        toast({
          title: "Login Successful",
        })
        dispatch({
          type: "setToken",
          data: token,
        })
        dispatch({
          type: "setUser",
          data: user,
        })
        graphQLClient.setHeader("authorization", `Bearer ${token}`)
        navigate("/")
      }
    } catch (err) {
      toast({
        title: "Something went wrong!",
      })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <form className="w-6/12" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          registerName="email"
          label="Email Address"
          placeholder="Email Address"
          register={register}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address format",
            },
          }}
          errors={errors}
        />

        <FormInput
          id="password"
          registerName="password"
          label="Password"
          placeholder="Password"
          register={register}
          validation={{
            required: "Password is required",
          }}
          errors={errors}
          type="password"
        />

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </div>
  )
}
