import React, { useState } from 'react';
import { PageInfo, Social } from '../typings';
import emailjs from '@emailjs/browser';
import { SocialIcon } from 'react-social-icons';

type Props = {
	pageInfo: PageInfo;
};

function ContactMe({ pageInfo }: Props) {
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);
	const [name, setName] = useState('');
	const [nameValid, setNameValid] = useState(false);
	const [subject, setSubject] = useState('');
	const [subjectValid, setSubjectValid] = useState(false);
	const [message, setMessage] = useState('');
	const [messageValid, setMessageValid] = useState(false);

	const [isdisabled, setIsDisabled] = useState(true);

	const links = [
		{
			name: 'Telegram',
			url: 'https://t.me/zidxne1',
			network: 'telegram',
			text: pageInfo?.address,
		},
		{
			name: 'Linkedin',
			url: 'https://www.linkedin.com/in/zidane-innis/',
			network: 'linkedin',
			text: pageInfo?.phoneNumber,
		},
		{
			name: 'Email',
			url: 'mailto:zidaneinnis@gmail.com',
			network: 'email',
			text: pageInfo?.email,
		},
	];

	function validateNameInterceptor(e: any) {
		setName(e.target.value);

		if (e.target.value.length > 2) {
			setNameValid(true);
			return true;
		} else {
			setNameValid(false);

			return false;
		}
	}

	function validateEmailInterceptor(e: any) {
		setEmail(e.target.value);
		const filter =
			/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
		let pass = String(e.target.value).search(filter) != -1;
		if (pass) {
			setEmailValid(true);
			return true;
		} else {
			setEmailValid(false);
			return false;
		}
	}

	function validateSubjectInterceptor(e: any) {
		setSubject(e.target.value);

		if (e.target.value.length > 2 && e.target.value.length < 56) {
			setSubjectValid(true);
			return true;
		} else {
			setSubjectValid(false);
			return false;
		}
	}
	function validateMessageInterceptor(e: any) {
		setMessage(e.target.value);

		if (e.target.value.length < 4000) {
			setMessageValid(true);
			return true;
		} else {
			setMessageValid(false);
			return false;
		}
	}
	const [input, setInput] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	// const sendEmail = (e: any) => {
	//   e.preventDefault();

	//   emailjs
	//     .sendForm(
	//       "service_c2i43fi",
	//       "template_2hcql09",
	//       e.currentTarget,
	//       "tDGyBqf16EkmbUFVk"
	//     )
	//     .then(
	//       (result) => {
	//         console.log(result.text);
	//       },
	//       (error) => {
	//         console.log(error.text);
	//       }
	//     );
	//   e.currentTarget.reset();
	// };
	const onChange = (e: any) => {
		setInput((prevState) => e.target.value);
		if (emailValid && nameValid && subjectValid && messageValid) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};
	const sendEmail = (e: any) => {
		if (emailValid && nameValid && subjectValid && messageValid) {
			emailjs
				.sendForm(
					'service_c2i43fi',
					'template_2hcql09',
					e.currentTarget,
					'tDGyBqf16EkmbUFVk'
				)
				.then(() => {
					alert('Message sent. Thank you.');
				})
				.catch(() => {
					alert('Message not sent. Please check internet connection.');
				});
		} else if (!nameValid) {
			alert('10 digit dialing');
		}
		e.currentTarget.reset();
		setIsDisabled(true);
	};

	return (
		<div className="relative w-screen h-screen flex flex-col items-center justify-center pb-20 text-center md:text-left md:flex-row top-6 lg:top-20 ">
			<h3 className="absolute mb-5 text-center tracking-[20px] uppercase text-3xl font-semibold md:text-5xl text-gray-500 top-[-20px]">
				Contact
			</h3>

			<div className="flex flex-col">
				<div className="p-5 space-y-10">
					{links.map((link) => (
						<div className="flex items-center " key={link.name}>
							<SocialIcon
								className="transition cursor-pointer text-[#F7AB0A]  animate-pulse"
								network={link.network}
								fgColor="currentColor"
								bgColor="transparent"
							/>

							<a
								className="text-2xl custom-underline cursor-pointer"
								href={link.url}
								rel="noreferrer"
								target="_blank"
							>
								{link.text}
							</a>
						</div>
					))}
				</div>

				<form
					onChange={onChange}
					onSubmit={sendEmail}
					className="flex flex-col w-screen p-5 space-y-2 md:w-fit "
				>
					<div className="flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row">
						<input
							onChange={(e) => {
								validateNameInterceptor(e);
							}}
							value={input.name}
							name="name"
							className="rounded-lg contactInput"
							placeholder="Name"
							type="text"
						/>
						<input
							onChange={(e) => {
								validateEmailInterceptor(e);
							}}
							name="email"
							value={input.email}
							className="rounded-lg contactInput"
							placeholder="Email"
							type="email"
						/>
					</div>

					<input
						onChange={(e) => {
							validateSubjectInterceptor(e);
						}}
						name="subject"
						value={input.subject}
						className="rounded-lg contactInput"
						placeholder="Subject"
					></input>
					<textarea
						onChange={(e) => {
							validateMessageInterceptor(e);
						}}
						value={input.message}
						className="rounded-lg contactInput"
						name="message"
						placeholder="Message..."
					></textarea>

					<button
						type="submit"
						className="bg-[#F7AB0A] py-5   rounded-2xl  text-black font-bold hover:opacity-80 transition-all duration-500 cursor-pointer"
						disabled={isdisabled}
					>
						Send Mesaage
					</button>
				</form>
			</div>
		</div>
	);
}

export default ContactMe;
