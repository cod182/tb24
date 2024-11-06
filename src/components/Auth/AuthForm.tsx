import React from 'react'

type Props = {
	isRegistering: boolean;
	setIsRegistering: (state: boolean) => void;
	handleSubmit: (formData: HTMLFormElement) => void;
}
const AuthForm = ({ isRegistering, setIsRegistering, handlleSubmit }: Props) => {
	return (
		<div>AuthForm</div>
	)
}

export default AuthForm