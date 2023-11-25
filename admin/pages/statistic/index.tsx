// import BuyerProfilePieChart from "src/Components/BuyerProfilePieChart";
// import DashboardStatsGrid from "src/Components/DashboardStatsGrid";
import React from "react";
import { Tab, Tabs } from "src/Components/Tabs";
import TotalSpent from "src/Components/TotalSpent";
import WeeklyRevenue from "src/Components/WeeklyRevenue";
import MainLayout from "src/Layouts/MainLayout";
import { Top10ProductResponeModel, Top5CustomerResponeModel, Top5EmployeeResponeModel } from "src/Model/apiModel";
import { Top10ProductBestSale, Top5CustomerBuy, Top5EmployeeBestSale } from "src/services/api/statistic";


function Statistic() {
	const [listEmployee, setListEmployee] = React.useState<Top5EmployeeResponeModel[]>([]);
	const [listCustomer, setListCustomer] = React.useState<Top5CustomerResponeModel[]>([]);
	const [listProduct, setListProduct] = React.useState<Top10ProductResponeModel[]>([]);

	async function FetchApi() {
		try {
			let top5Employee = await Top5EmployeeBestSale();
			let top5Customer = await Top5CustomerBuy();
			let top10Product = await Top10ProductBestSale()

			setListEmployee(top5Employee?.data as Top5EmployeeResponeModel[])
			setListCustomer(top5Customer?.data as Top5CustomerResponeModel[])
			setListProduct(top10Product?.data as Top10ProductResponeModel[])
		} catch (error) {

		}
	}

	React.useEffect(() => {
		FetchApi()
	}, [])

	return (
		<MainLayout>
			<div className="flex h-max">
				<div className="basis-3/6">
					<TotalSpent />
				</div>
				<div className="flex-1">
					{/* Statistic this month */}
					<div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
						<h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">Statistics this month
						</h3>
						<Tabs>
							<Tab label="Top Products">
								<li className="flex flex-col py-3 sm:py-4">
									<div className="flex items-center justify-between">
										{listProduct.map((item: Top10ProductResponeModel, index: number) => {
											return <>
												<img className="flex-shrink-0 w-10 h-10" src="" alt="imac image" />
												<div key={index} className="ml-3">
													<div className="flex items-center min-w-0">
														<p className="font-medium text-gray-900 truncate dark:text-white">
															{item.name_product}
														</p>
														{/* <div className="flex items-center justify-end flex-1 text-sm text-green-500 dark:text-green-400">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
											<path clip-rule="evenodd" fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
											</svg>
											2.5%
											<span className="ml-2 text-gray-500">vs last month</span>
										</div> */}
													</div>
												</div>
												<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
													{item.total}
												</div>
											</>
										})}
									</div>
								</li>
							</Tab>
							<Tab label="Top Employees">
								<li className="py-3 sm:py-4">
									<div className="flex items-center justify-between">
										{listEmployee.map((item: Top5EmployeeResponeModel, index: number) => {
											return <>
												{/* <img className="flex-shrink-0 w-10 h-10" src="" alt="imac image" /> */}
												<div key={index} className="ml-3">
													<div className="flex items-center min-w-0">
														<p className="font-medium text-gray-900 truncate dark:text-white">
															{item.employee_email}
														</p>
														{/* <div className="flex items-center justify-end flex-1 text-sm text-green-500 dark:text-green-400">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
											<path clip-rule="evenodd" fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
											</svg>
											2.5%
											<span className="ml-2 text-gray-500">vs last month</span>
										</div> */}
													</div>
												</div>
												<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
													{item.total}
												</div>
											</>
										})}
									</div>
								</li>
							</Tab>
							<Tab label="Top Customers">
								<li className="py-3 sm:py-4">
									<div className="flex flex-col">
										{listCustomer.map((item: Top5CustomerResponeModel, index: number) => {
											return <>
												<div className="flex items-center justify-between">
													{/* <img className="flex-shrink-0 w-10 h-10" src="" alt="imac image" /> */}
													<div key={index} className="ml-3">
														<div className="flex items-center min-w-0">
															<p className="font-medium text-gray-900 truncate dark:text-white">
																{item.customer_first_name} {item.customer_last_name}
															</p>
															{/* <div className="flex items-center justify-end flex-1 text-sm text-green-500 dark:text-green-400">
												<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
												<path clip-rule="evenodd" fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"></path>
												</svg>
												2.5%
												<span className="ml-2 text-gray-500">vs last month</span>
											</div> */}
														</div>
													</div>
													<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
														{item.total}
													</div>
												</div>
											</>
										})}
									</div>
								</li>
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</MainLayout>
	);
}

export default Statistic;