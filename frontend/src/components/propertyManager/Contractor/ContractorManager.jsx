import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Mail, Phone, MapPin, Star, Edit, Trash2, Search, UserCheck } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dummy contractor data
const contractorData = [
	{
		id: 1,
		name: 'Ahmed Hassan',
		company: 'Hassan Plumbing Services',
		jobsCompleted: 45,
		email: 'ahmed@hassanplumbing.ae',
		phone: '+971-50-123-4567',
		address: 'Dubai Marina, Dubai, UAE',
		specialties: ['Plumbing', 'Water Heater Repair'],
		rating: 4.8,
		rate: 150,
		status: 'active',
	},
	{
		id: 2,
		name: 'Sarah Johnson',
		company: 'Elite Electrical Solutions',
		jobsCompleted: 62,
		email: 'sarah@eliteelectrical.ae',
		phone: '+971-55-987-6543',
		address: 'Business Bay, Dubai, UAE',
		specialties: ['Electrical', 'AC Installation', 'Smart Home'],
		rating: 4.9,
		rate: 175,
		status: 'active',
	},
];

const statusColors = {
	active: 'bg-green-100 text-green-700',
	inactive: 'bg-gray-100 text-gray-700',
};

const specialtiesList = [
	'Plumbing',
	'Water Heater Repair',
	'Electrical',
	'AC Installation',
	'Smart Home',
];

const ContractorManager = () => {
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [specialtyFilter, setSpecialtyFilter] = useState('all');
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [selectedContractor, setSelectedContractor] = useState(null);
	const [contractors, setContractors] = useState(contractorData);
	const [editForm, setEditForm] = useState({
		name: '',
		company: '',
		email: '',
		phone: '',
		specialties: [],
		rate: '',
		status: 'active'
	});

	// Filtering logic
	const filteredContractors = contractors.filter((c) => {
		const matchesSearch =
			c.name.toLowerCase().includes(search.toLowerCase()) ||
			c.company.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
		const matchesSpecialty =
			specialtyFilter === 'all' || c.specialties.includes(specialtyFilter);
		return matchesSearch && matchesStatus && matchesSpecialty;
	});

	const handleEditClick = (contractor) => {
		setSelectedContractor(contractor);
		setEditForm({
			name: contractor.name,
			company: contractor.company,
			email: contractor.email,
			phone: contractor.phone,
			specialties: contractor.specialties,
			rate: contractor.rate,
			status: contractor.status
		});
		setIsEditDialogOpen(true);
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		setContractors(prevContractors => 
			prevContractors.map(contractor => 
				contractor.id === selectedContractor.id 
					? { ...contractor, ...editForm }
					: contractor
			)
		);
		setIsEditDialogOpen(false);
		setSelectedContractor(null);
	};

	const handleDelete = () => {
		setContractors(prevContractors => 
			prevContractors.filter(contractor => contractor.id !== selectedContractor.id)
		);
		setIsDeleteDialogOpen(false);
		setSelectedContractor(null);
	};

	const handleEditFormChange = (e) => {
		const { name, value } = e.target;
		setEditForm(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSpecialtyChange = (specialty) => {
		setEditForm(prev => ({
			...prev,
			specialties: prev.specialties.includes(specialty)
				? prev.specialties.filter(s => s !== specialty)
				: [...prev.specialties, specialty]
		}));
	};

	// Render stars for rating
	const renderStars = (rating) => {
		const fullStars = Math.floor(rating);
		const stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				<Star
					key={i}
					className={`inline-block w-4 h-4 ${
						i < fullStars ? 'text-yellow-400' : 'text-gray-300'
					}`}
					fill={i < fullStars ? '#facc15' : 'none'}
				/>
			);
		}
		return stars;
	};

	return (
		<div className="min-h-screen bg-gray-50/50">
			<div className="p-6">
				{/* Header */}
				<header className="flex items-center justify-between mb-6">
					<div className="flex items-center gap-3">
						<UserCheck className="w-8 h-8 text-blue-600" />
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Contractors</h1>
							<p className="mt-1 text-gray-600">Manage contractors and their services</p>
						</div>
					</div>
					<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
						<DialogTrigger asChild>
							<Button className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-lg cursor-pointer hover:bg-blue-700 hover:shadow-xl">
								<Plus size={20} />
								Add Contractor
							</Button>
						</DialogTrigger>
						<DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
							<div className="p-6">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-xl font-semibold text-gray-800">Add New Contractor</h2>
								</div>
								<form className="space-y-4">
									<div className="grid gap-4">
										<div>
											<Label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name *</Label>
											<Input id="name" placeholder="Enter contractor name" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
										</div>
										<div>
											<Label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">Company *</Label>
											<Input id="company" placeholder="Enter company name" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
										</div>
										<div>
											<Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email *</Label>
											<Input id="email" type="email" placeholder="Enter email" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
										</div>
										<div>
											<Label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">Phone *</Label>
											<Input id="phone" placeholder="Enter phone number" className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
										</div>
									</div>
									<div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
										<Button
											type="button"
											onClick={() => setIsAddDialogOpen(false)}
											className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
										>
											Cancel
										</Button>
										<Button
											type="submit"
											className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
										>
											Add Contractor
										</Button>
									</div>
								</form>
							</div>
						</DialogContent>
					</Dialog>
				</header>

				{/* Filters */}
				<Card className="p-4 mb-6 border-0 bg-white/80 backdrop-blur-sm">
					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="relative flex-1">
							<Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
							<Input
								type="text"
								placeholder="Search contractors..."
								className="py-2 pl-10 bg-gray-100 border-0 rounded-lg"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						<select
							className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border-0 border-gray-200 rounded-md"
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
						>
							<option value="all">All Status</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
						<select
							className="px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-200 rounded-md"
							value={specialtyFilter}
							onChange={(e) => setSpecialtyFilter(e.target.value)}
						>
							<option value="all">All Specialties</option>
							{specialtiesList.map((s) => (
								<option key={s} value={s}>{s}</option>
							))}
						</select>
					</div>
				</Card>

				{/* Contractors Table */}
				<Card className="border-0 bg-white/80 backdrop-blur-sm">
					<div className="overflow-x-auto">
						<table className="w-full text-sm border border-gray-200">
							<thead>
								<tr className="border-b border-gray-200 bg-gray-50/50">
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Contractor</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Contact</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Specialties</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Rating</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Rate/Hour</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900 border-r border-gray-200">Status</th>
									<th className="px-6 py-4 font-medium text-left text-gray-900">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredContractors.map((c) => (
									<tr key={c.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50">
										<td className="px-6 py-4 border-r border-gray-200">
											<div className="font-medium text-gray-900">{c.name}</div>
											<div className="text-sm text-gray-500">{c.company}</div>
											<div className="text-xs text-gray-400">{c.jobsCompleted} jobs</div>
										</td>
										<td className="px-6 py-4 border-r border-gray-200">
											<div className="flex items-center gap-1 text-sm text-gray-600">
												<Mail className="w-4 h-4" />
												<span className="truncate max-w-[150px]">{c.email}</span>
											</div>
											<div className="flex items-center gap-1 text-sm text-gray-600">
												<Phone className="w-4 h-4" />
												<span>{c.phone}</span>
											</div>
										</td>
										<td className="px-6 py-4 border-r border-gray-200">
											<div className="flex flex-wrap gap-1">
												{c.specialties.map((s, i) => (
													<span
														key={i}
														className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs"
													>
														{s}
													</span>
												))}
											</div>
										</td>
										<td className="px-6 py-4 border-r border-gray-200">
											<div className="flex items-center gap-1">
												{renderStars(c.rating)}
												<span className="text-xs text-gray-500">({c.rating})</span>
											</div>
										</td>
										<td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200">AED {c.rate}</td>
										<td className="px-6 py-4 border-r border-gray-200">
											<span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[c.status]}`}>
												{c.status.charAt(0).toUpperCase() + c.status.slice(1)}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex gap-2">
												<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
													<DialogTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															onClick={() => handleEditClick(c)}
															className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-blue-600 hover:bg-blue-50"
														>
															<Edit className="w-4 h-4" />
														</Button>
													</DialogTrigger>
													<DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
														<div className="p-6">
															<div className="flex items-center justify-between mb-6">
																<h2 className="text-xl font-semibold text-gray-800">Edit Contractor</h2>
															</div>
															<form onSubmit={handleEditSubmit} className="space-y-4">
																<div className="grid gap-4">
																	<div>
																		<Label htmlFor="edit-name" className="block mb-2 text-sm font-medium text-gray-700">Name *</Label>
																		<Input
																			id="edit-name"
																			name="name"
																			value={editForm.name}
																			onChange={handleEditFormChange}
																			placeholder="Enter contractor name"
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		/>
																	</div>
																	<div>
																		<Label htmlFor="edit-company" className="block mb-2 text-sm font-medium text-gray-700">Company *</Label>
																		<Input
																			id="edit-company"
																			name="company"
																			value={editForm.company}
																			onChange={handleEditFormChange}
																			placeholder="Enter company name"
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		/>
																	</div>
																	<div>
																		<Label htmlFor="edit-email" className="block mb-2 text-sm font-medium text-gray-700">Email *</Label>
																		<Input
																			id="edit-email"
																			name="email"
																			type="email"
																			value={editForm.email}
																			onChange={handleEditFormChange}
																			placeholder="Enter email"
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		/>
																	</div>
																	<div>
																		<Label htmlFor="edit-phone" className="block mb-2 text-sm font-medium text-gray-700">Phone *</Label>
																		<Input
																			id="edit-phone"
																			name="phone"
																			value={editForm.phone}
																			onChange={handleEditFormChange}
																			placeholder="Enter phone number"
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		/>
																	</div>
																	<div>
																		<Label htmlFor="edit-rate" className="block mb-2 text-sm font-medium text-gray-700">Rate/Hour (AED) *</Label>
																		<Input
																			id="edit-rate"
																			name="rate"
																			type="number"
																			value={editForm.rate}
																			onChange={handleEditFormChange}
																			placeholder="Enter hourly rate"
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		/>
																	</div>
																	<div>
																		<Label className="block mb-2 text-sm font-medium text-gray-700">Specialties *</Label>
																		<div className="flex flex-wrap gap-2">
																			{specialtiesList.map((specialty) => (
																				<button
																					key={specialty}
																					type="button"
																					onClick={() => handleSpecialtyChange(specialty)}
																					className={`px-3 py-1 text-sm rounded-full transition-colors ${
																						editForm.specialties.includes(specialty)
																							? 'bg-blue-100 text-blue-700'
																							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
																					}`}
																				>
																					{specialty}
																				</button>
																			))}
																		</div>
																	</div>
																	<div>
																		<Label htmlFor="edit-status" className="block mb-2 text-sm font-medium text-gray-700">Status *</Label>
																		<select
																			id="edit-status"
																			name="status"
																			value={editForm.status}
																			onChange={handleEditFormChange}
																			className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
																		>
																			<option value="active">Active</option>
																			<option value="inactive">Inactive</option>
																		</select>
																	</div>
																</div>
																<div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
																	<Button
																		type="button"
																		onClick={() => setIsEditDialogOpen(false)}
																		className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
																	>
																		Cancel
																	</Button>
																	<Button
																		type="submit"
																		className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
																	>
																		Update Contractor
																	</Button>
																</div>
															</form>
														</div>
													</DialogContent>
												</Dialog>
												<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
													<DialogTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="p-1 text-gray-500 transition-colors rounded cursor-pointer hover:text-red-600 hover:bg-red-50"
															onClick={() => {
																setSelectedContractor(c);
																setIsDeleteDialogOpen(true);
															}}
														>
															<Trash2 className="w-4 h-4" />
														</Button>
													</DialogTrigger>
													<DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
														<div className="p-6">
															<h2 className="mb-4 text-xl font-semibold text-gray-800">Delete Contractor</h2>
															<p className="mb-6 text-gray-600">
																Are you sure you want to delete the contractor "<strong>{selectedContractor?.name}</strong>"? This action cannot be undone.
															</p>
															<div className="flex justify-end space-x-3">
																<Button
																	onClick={() => setIsDeleteDialogOpen(false)}
																	className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
																>
																	Cancel
																</Button>
																<Button
																	onClick={handleDelete}
																	className="px-4 py-2 text-sm font-medium text-white transition-colors bg-red-600 rounded-md cursor-pointer hover:bg-red-700"
																>
																	Delete
																</Button>
															</div>
														</div>
													</DialogContent>
												</Dialog>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default ContractorManager;