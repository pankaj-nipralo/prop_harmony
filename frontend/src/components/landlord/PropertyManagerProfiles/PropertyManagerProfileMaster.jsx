import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "react-hot-toast"
import { Search, Star, MapPin, Briefcase, Building2, Mail } from 'lucide-react'

// Mock data for demonstration
const mockPropertyManagers = [
  {
    id: 1,
    name: "Pankaj Gupta",
    location: "Mumbai, India",
    experience: 1,
    services: ["Residential", "Commercial", "Property Maintenance"],
    rating: 4.8,
    image: "https://ui-avatars.com/api/?name=Pankaj+Gupta&background=0D8ABC&color=fff&size=150",
    bio: "Experienced property manager with a focus on residential and commercial properties in Mumbai. Specialized in luxury real estate and property maintenance.",
    portfolio: ["Luxury Apartments", "Office Buildings", "Retail Spaces"],
    availability: "Available for new properties",
    reviews: [
      { author: "Rajesh Kumar", rating: 5, comment: "Excellent service! Pankaj has been managing our properties for over 5 years and we couldn't be happier." },
      { author: "Priya Sharma", rating: 4, comment: "Very professional and responsive. Always available when needed." }
    ]
  },
  {
    id: 2,
    name: "Uzair Sayyed",
    location: "Dubai, UAE",
    experience: 12,
    services: ["Luxury Residential", "Property Marketing", "Tenant Relations"],
    rating: 4.9,
    image: "https://ui-avatars.com/api/?name=Uzair+Sayyed&background=2563EB&color=fff&size=150",
    bio: "Specialized in luxury residential properties in Dubai with a strong focus on tenant satisfaction and property marketing. Expert in high-end property management.",
    portfolio: ["Palm Jumeirah Villas", "Downtown Dubai Apartments", "Dubai Marina Properties"],
    availability: "Limited availability",
    reviews: [
      { author: "Ahmed Al Mansouri", rating: 5, comment: "Uzair transformed our property management experience. His attention to detail is unmatched." },
      { author: "Fatima Khan", rating: 5, comment: "Best property manager in Dubai! He handles everything professionally." }
    ]
  },
  {
    id: 3,
    name: "Gaurav Kanchan",
    location: "Bangalore, India",
    experience: 16,
    services: ["Tech Office Spaces", "Commercial", "Property Analytics"],
    rating: 4.7,
    image: "https://ui-avatars.com/api/?name=Gaurav+Kanchan&background=059669&color=fff&size=150",
    bio: "Tech-savvy property manager specializing in commercial spaces and office buildings in Bangalore. Expert in property analytics and optimization.",
    portfolio: ["Tech Parks", "IT Office Spaces", "Commercial Complexes"],
    availability: "Available for new properties",
    reviews: [
      { author: "TechStartup India", rating: 5, comment: "Gaurav's understanding of tech office requirements is exceptional." },
      { author: "Venture Capital", rating: 4, comment: "Great analytical approach to property management." }
    ]
  },
  {
    id: 4,
    name: "Aisha Rahman",
    location: "Abu Dhabi, UAE",
    experience: 10,
    services: ["Luxury Villas", "Property Maintenance", "Guest Relations"],
    rating: 4.9,
    image: "https://ui-avatars.com/api/?name=Aisha+Rahman&background=7C3AED&color=fff&size=150",
    bio: "Specialized in luxury villa management with a focus on guest experience and property maintenance. Expert in high-end property management.",
    portfolio: ["Saadiyat Island Villas", "Al Raha Beach Properties", "Yas Island Residences"],
    availability: "Available for new properties",
    reviews: [
      { author: "Mohammed Al Qasimi", rating: 5, comment: "Aisha makes luxury property management look easy. Excellent service!" },
      { author: "Property Owner", rating: 5, comment: "She handles everything perfectly. Our properties are always well-maintained." }
    ]
  },
  {
    id: 5,
    name: "Rajesh Patel",
    location: "Delhi NCR, India",
    experience: 1,
    services: ["Industrial Properties", "Commercial", "Property Development"],
    rating: 4.8,
    image: "https://ui-avatars.com/api/?name=Rajesh+Patel&background=DC2626&color=fff&size=150",
    bio: "Veteran property manager with extensive experience in industrial and commercial properties in Delhi NCR. Expert in property development and optimization.",
    portfolio: ["Industrial Parks", "Warehouses", "Commercial Centers"],
    availability: "Limited availability",
    reviews: [
      { author: "Industrial Corp India", rating: 5, comment: "Rajesh has been managing our industrial properties for years. Outstanding service." },
      { author: "Developer", rating: 4, comment: "Great understanding of property development and management." }
    ]
  },
  {
    id: 6,
    name: "Fatima Al Hashemi",
    location: "Sharjah, UAE",
    experience: 7,
    services: ["Residential", "Property Marketing", "Sustainability"],
    rating: 4.7,
    image: "https://ui-avatars.com/api/?name=Fatima+Al+Hashemi&background=9333EA&color=fff&size=150",
    bio: "Specialized in residential property management with a focus on sustainable practices. Expert in property marketing and tenant relations.",
    portfolio: ["Al Nahda Properties", "Al Qasimia Residences", "Sustainable Homes"],
    availability: "Available for new properties",
    reviews: [
      { author: "UAE Living", rating: 5, comment: "Fatima's commitment to sustainable property management is impressive." },
      { author: "Green Investor", rating: 4, comment: "Great focus on sustainability and eco-friendly practices." }
    ]
  }
]

const PropertyManagerProfileMaster = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")
  const [selectedRating, setSelectedRating] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const [selectedManager, setSelectedManager] = useState(null)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const filteredManagers = mockPropertyManagers.filter(manager => {
    // Search query filter
    const matchesSearch = searchQuery === "" ||
      manager.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manager.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));

    // Location filter
    const matchesLocation = selectedLocation === "" ||
      manager.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Experience filter
    const matchesExperience = selectedExperience === "" ||
      (selectedExperience === "0-2" && manager.experience <= 2) ||
      (selectedExperience === "3-5" && manager.experience > 2 && manager.experience <= 5) ||
      (selectedExperience === "5+" && manager.experience > 5);

    // Rating filter
    const matchesRating = selectedRating === "" ||
      (selectedRating === "4+" && manager.rating >= 4) ||
      (selectedRating === "3+" && manager.rating >= 3) ||
      (selectedRating === "2+" && manager.rating >= 2);

    // Service filter
    const matchesService = selectedService === "" ||
      manager.services.some(service => service.toLowerCase() === selectedService.toLowerCase());

    return matchesSearch && matchesLocation && matchesExperience && matchesRating && matchesService;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedExperience("");
    setSelectedRating("");
    setSelectedService("");
  };

  const renderManagerCard = (manager) => (
    <Card key={manager.id} className="w-full max-w-full hover:shadow-lg transition-shadow duration-200 border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <div className="flex items-center gap-4">
          <img
            src={manager.image}
            alt={manager.name}
            className="w-16 h-16 rounded-full object-cover  "
          />
          <div>
            <CardTitle className="text-blue-900">{manager.name}</CardTitle>
            <div className="flex items-center text-sm text-blue-600">
              <MapPin className="w-4 h-4 mr-1" />
              {manager.location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
            <span>{manager.experience} years experience</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>{manager.rating} rating</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {manager.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t border-gray-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setSelectedManager(manager)}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            >
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="md:max-w-3xl bg-white border-0 shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Property Manager Profile</DialogTitle>
            </DialogHeader>
            <div className="grid grid-rows-3 gap-6">
              <div className="space-y-4 row-span-2">
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-blue-100"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-900">{manager.name}</h3>
                  <p className="text-blue-600">{manager.location}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Bio</h4>
                  <p className="text-gray-700">{manager.bio}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Services Offered</h4>
                  <ul className="space-y-1">
                    {manager.services.map((service, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Portfolio</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {manager.portfolio.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-white text-blue-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            {/* <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-4">Reviews</h4>
              <div className="space-y-4">
                {manager.reviews.map((review, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">{review.author}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className=" p-6 mx-auto space-y-6 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className=" ">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold">Find Property Managers</h1>
            <Button
              // variant="outline"
              onClick={resetFilters}
              className="text-sm text-blue-600 border border-blue-600 hover:text-blue-700 cursor-pointer hover:bg-blue-500 hover:text-white  transition-all duration-300 ease-out"
            >
              Reset Filters
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative w-full col-span-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
              <Input
                placeholder="Search by name, city, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 py-2 text-sm bg-white border border-blue-200 focus:ring-blue-600 focus:outline-none focus:border-none rounded-md"
              />
            </div>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 focus:border-blue-600 focus:ring-blue-600 rounded-md">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-blue-100 shadow-md rounded-md text-sm">
                <SelectItem value="dubai" className="hover:bg-gray-50 px-3 py-2">Dubai</SelectItem>
                <SelectItem value="mumbai" className="hover:bg-gray-50 px-3 py-2">Mumbai</SelectItem>
                <SelectItem value="bangalore" className="hover:bg-gray-50 px-3 py-2">Bangalore</SelectItem>
                <SelectItem value="delhi" className="hover:bg-gray-50 px-3 py-2">Delhi NCR</SelectItem>
                <SelectItem value="abu dhabi" className="hover:bg-gray-50 px-3 py-2">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah" className="hover:bg-gray-50 px-3 py-2">Sharjah</SelectItem>
              </SelectContent>
            </Select>

            {/* Experience Filter */}
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 focus:border-blue-600 focus:ring-blue-600 rounded-md">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-blue-100 shadow-md rounded-md text-sm">
                <SelectItem value="0-2" className="hover:bg-gray-50 px-3 py-2">0-2 years</SelectItem>
                <SelectItem value="3-5" className="hover:bg-gray-50 px-3 py-2">3-5 years</SelectItem>
                <SelectItem value="5+" className="hover:bg-gray-50 px-3 py-2">5+ years</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            {/* <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 focus:border-blue-600 focus:ring-blue-600 rounded-md">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-blue-100 shadow-md rounded-md text-sm">
                <SelectItem value="4+" className="hover:bg-gray-50 px-3 py-2">4+ stars</SelectItem>
                <SelectItem value="3+" className="hover:bg-gray-50 px-3 py-2">3+ stars</SelectItem>
                <SelectItem value="2+" className="hover:bg-gray-50 px-3 py-2">2+ stars</SelectItem>
              </SelectContent>
            </Select> */}

            {/* Services Filter */}
            {/* <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 focus:border-blue-600 focus:ring-blue-600 rounded-md">
                <SelectValue placeholder="Services" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-blue-100 shadow-md rounded-md text-sm">
                <SelectItem value="residential" className="hover:bg-gray-50 px-3 py-2">Residential</SelectItem>
                <SelectItem value="commercial" className="hover:bg-gray-50 px-3 py-2">Commercial</SelectItem>
                <SelectItem value="luxury residential" className="hover:bg-gray-50 px-3 py-2">Luxury Residential</SelectItem>
                <SelectItem value="property maintenance" className="hover:bg-gray-50 px-3 py-2">Property Maintenance</SelectItem>
                <SelectItem value="tech office spaces" className="hover:bg-gray-50 px-3 py-2">Tech Office Spaces</SelectItem>
                <SelectItem value="property analytics" className="hover:bg-gray-50 px-3 py-2">Property Analytics</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredManagers.length} property managers found
          </div>
        </div>

        {/* Property Manager Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredManagers.length > 0 ? (
            filteredManagers.map(renderManagerCard)
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No property managers found matching your criteria</p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="bg-white border border-blue-100 rounded-xl shadow-2xl p-6 max-w-md w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900 mb-4">
              Send Invitation
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Property Selection */}
            {/* <div className="space-y-1">
              <Label htmlFor="property" className="text-sm font-medium text-blue-900">
                Select Property
              </Label>
              <Select>
                <SelectTrigger className="w-full border rounded-md py-2 px-3 text-sm bg-white border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-blue-100 shadow-md rounded-md text-sm">
                  <SelectItem value="property1" className="px-3 py-2 hover:bg-gray-50">Property 1</SelectItem>
                  <SelectItem value="property2" className="px-3 py-2 hover:bg-gray-50">Property 2</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* Message Box */}
            <div className="space-y-1">
              <Label htmlFor="message" className="text-sm font-medium text-blue-900">
                Message (Optional)
              </Label>
              <textarea
                id="message"
                placeholder="Write your invitation message..."
                className="w-full h-32 text-sm rounded-md p-3 bg-transparent resize-none focus:outline-none border shadow-none"
              />

            </div>

            {/* Send Button */}
            <Button
              onClick={() => {
                setShowInviteModal(false); // Close modal
                toast.success("Invitation sent successfully"); // Show toast
              }}
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md flex items-center justify-center transition"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>

          </div>
        </DialogContent>
      </Dialog>

      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#fff',
            color: '#333',
          },
        }}
      />

    </div>
  )
}

export { PropertyManagerProfileMaster as default };