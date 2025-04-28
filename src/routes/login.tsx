import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	// 페이지 진입 시 애니메이션 효과 적용
	useEffect(() => {
		// 페이지 요소들이 DOM에 추가된 후 애니메이션 클래스 추가
		const timer = setTimeout(() => {
			document.querySelector(".login-container")?.classList.add("show");
		}, 50);

		return () => clearTimeout(timer);
	}, []);

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
					<h1 className="title-bold-56 text-center md:text-8xl sm:text-7xl whitespace-pre-line leading-130 slide-in">
						{"시간을 소중히 여긴다면,\n모립과 함께 집중해보세요"}
					</h1>

					{/* 버튼 - 피그마 기준 비율 유지 */}
					<button
						type="button"
						className="w-[34.5rem] cursor-pointer subhead-bold-20 h-[5.4rem] bg-main-gradient hover:bg-main-gradient-hover active:bg-main-gradient-press text-[#333333] py-4 px-16 rounded-lg fade-in-up"
						onClick={() => {
							// 여기에 로그인 로직 추가
							console.log("로그인 처리 중...");
						}}
					>
						Morib에 로그인하기
					</button>
				</div>
			</div>
		</div>
	);
}
