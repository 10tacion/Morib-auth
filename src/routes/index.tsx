import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const [typedText, setTypedText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const fullText = "온전한 몰입 공간";
	const typingSpeed = 150; // 타이핑 속도 (ms)
	const deletingSpeed = 80; // 삭제 속도 (ms)
	const pauseTime = 4000; // 완성된 후 대기 시간 (ms)
	const typingRef = useRef<HTMLSpanElement>(null);
	const navigate = useNavigate();

	// 페이지 진입 시 애니메이션
	useEffect(() => {
		document.querySelector(".main-container")?.classList.add("show");
	}, []);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;

		// 타이핑 효과
		if (!isDeleting && typedText !== fullText) {
			timeout = setTimeout(() => {
				setTypedText(fullText.substring(0, typedText.length + 1));
			}, typingSpeed);
		}
		// 완성 후 대기
		else if (!isDeleting && typedText === fullText) {
			timeout = setTimeout(() => {
				setIsDeleting(true);
			}, pauseTime);
		}
		// 삭제 효과
		else if (isDeleting && typedText !== "") {
			timeout = setTimeout(() => {
				setTypedText(fullText.substring(0, typedText.length - 1));
			}, deletingSpeed);
		}
		// 삭제 완료 후 다시 시작
		else if (isDeleting && typedText === "") {
			timeout = setTimeout(() => {
				setIsDeleting(false);
			}, pauseTime / 2);
		}

		return () => clearTimeout(timeout);
	}, [typedText, isDeleting]);

	// 커서 깜빡임 효과
	useEffect(() => {
		if (!typingRef.current) return;

		const blinkInterval = setInterval(() => {
			if (typingRef.current) {
				typingRef.current.classList.toggle("typing-cursor");
			}
		}, 500);

		return () => clearInterval(blinkInterval);
	}, []);

	// 페이지 전환 핸들러
	const handleNavigateToLogin = () => {
		setIsExiting(true);
		// 애니메이션이 완료된 후 페이지 이동
		setTimeout(() => {
			navigate({ to: "/login", replace: true });
		}, 700);
	};

	return (
		<div className="h-screen w-screen fixed">
			<div className="main-container flex h-screen w-screen items-center justify-end pl-[12.5vw] py-[12.5vh] bg-[#181C22] text-white relative overflow-hidden transition-all duration-700 opacity-0">
				<div
					className={`bg-animate transition-opacity duration-500 ${isExiting ? "opacity-0" : ""}`}
				/>

				{/* 파티클 요소들 */}
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />
				<div className="particle" />

				<div
					className={`flex h-full w-full items-center relative z-10 transition-all duration-700 ${isExiting ? "translate-y-12 opacity-0" : ""}`}
				>
					<section className="flex-[4] flex flex-col justify-center h-[39.63vh] gap-[8rem]">
						<img
							src="/logo.svg"
							alt="Morib 로고"
							className="w-[22.4rem] h-auto logo-animate"
						/>

						{/* 제목 - 피그마 기준 72px 폰트, 줄간격 1.3 */}
						<div className="flex w-full flex-col">
							{/* 타이틀 영역에 고정 높이 지정 */}
							<div className="mb-[3rem]">
								<h1 className="title-bold-72 md:text-8xl sm:text-7xl whitespace-pre-line leading-130 flex flex-col">
									<span className="title-animate">당신을 위한</span>
									<span className="typing-cursor typing-container mt-[-1rem]">
										{typedText}
									</span>
								</h1>
							</div>

							{/* 버튼 - 피그마 기준 비율 유지 */}
							<button
								type="button"
								className="w-[34.5rem] cursor-pointer subhead-bold-20 h-[5.4rem] bg-main-gradient hover:bg-main-gradient-hover active:bg-main-gradient-press text-[#333333] py-4 px-16 rounded-lg btn-animate"
								onClick={handleNavigateToLogin}
							>
								Morib에 로그인하기
							</button>
						</div>
					</section>

					<section className="flex-[10] relative h-full flex items-center">
						<img
							src="/timer.svg"
							alt="몰입 타이머 시각화"
							className="ml-[3.7rem] w-full h-auto img-animate"
						/>
					</section>
				</div>
			</div>
		</div>
	);
}
