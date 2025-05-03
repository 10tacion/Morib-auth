import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/redirect")({
	component: RouteComponent,
});

function RouteComponent() {
	const params = new URLSearchParams(window.location.hash.substring(1));

	const accessToken = params.get("accessToken");
	const refreshToken = params.get("refreshToken");
	const isOnboardingComplete = params.get("isOnboardingComplete");

	// 페이지 진입 시 애니메이션 효과 적용
	useEffect(() => {
		// 페이지 요소들이 DOM에 추가된 후 애니메이션 클래스 추가
		const timer = setTimeout(() => {
			document.querySelector(".login-container")?.classList.add("show");
		}, 50);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (accessToken && refreshToken && isOnboardingComplete) {
			window.location.href = `morib://?accessToken=${encodeURIComponent(accessToken)}&refreshToken=${encodeURIComponent(refreshToken)}&isOnboardingComplete=${encodeURIComponent(isOnboardingComplete)}`;
		}
	}, [accessToken, refreshToken, isOnboardingComplete]);

	return (
		<div className="flex flex-col h-screen w-screen justify-center items-center text-white bg-[#181C22] overflow-hidden relative">
			{/* 파티클 요소들 */}
			<div className="particle" />
			<div className="particle" />
			<div className="particle" />
			<div className="particle" />
			<div className="particle" />
			<div className="particle" />

			{/* 배경 그라데이션 애니메이션 */}
			<div className="bg-animate" />

			<div className="w-[63.7rem] h-[47.7rem] login-container opacity-0 transform translate-y-8 transition-all duration-700 ease-out flex flex-col justify-center items-center gap-[8rem] z-10">
				<img
					src="/logo.svg"
					alt="Morib 로고"
					className="w-[22.4rem] h-auto fade-in"
				/>

				<div className="flex flex-col justify-center items-center gap-[6rem]">
					<h1 className="text-4xl text-center 2xl:text-7xl md:text-7xl sm:text-6xl font-bold whitespace-pre-line leading-130 slide-in">
						{"로그인이 완료되었어요,\n모립에 오신 것을 환영해요!"}
					</h1>

					{/* 버튼 - 피그마 기준 비율 유지 */}
				</div>
			</div>
		</div>
	);
}
