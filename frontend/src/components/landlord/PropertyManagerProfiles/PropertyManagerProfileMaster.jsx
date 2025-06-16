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
    <Card key={manager.id} className="w-full max-w-full transition-shadow duration-200 bg-white border-0 hover:shadow-lg">
      <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-4">
          <img
            src={manager.image}
            alt={manager.name}
            className="object-cover w-16 h-16 rounded-full "
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
          {/* <div className="flex items-center text-gray-700">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            <span>{manager.rating} rating</span>
          </div> */}
          <div className="flex flex-wrap gap-2 mt-2">
            {manager.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-blue-700 rounded-full bg-blue-50"
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
              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-0 shadow-xl md:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Property Manager Profile</DialogTitle>
            </DialogHeader>
            <div className="grid grid-rows-3 gap-6">
              <div className="row-span-2 space-y-4">
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="object-cover w-32 h-32 mx-auto rounded-full ring-4 ring-blue-100"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-900">{manager.name}</h3>
                  <p className="text-blue-600">{manager.location}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="mb-2 font-semibold text-blue-900">Bio</h4>
                  <p className="text-gray-700">{manager.bio}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col p-3 rounded-lg bg-blue-50">
                  <h4 className="mb-1 font-semibold text-blue-900">Services Offered</h4>
                  <ul className="space-y-1">
                    {manager.services.map((service, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col p-3 rounded-lg bg-blue-50">
                  <h4 className="mb-1 font-semibold text-blue-900">Portfolio</h4>
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
            {/* <div className="p-4 mt-6 rounded-lg bg-blue-50">
              <h4 className="mb-4 font-semibold text-blue-900">Reviews</h4>
              <div className="space-y-4">
                {manager.reviews.map((review, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg">
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
          className="text-white bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="min-h-screen p-6 mx-auto space-y-6 ">
      <div className="flex flex-col gap-6">
        <div className="">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">Find Property Managers</h1>
            <Button
              // variant="outline"
              onClick={resetFilters}
              className="text-sm text-blue-600 transition-all duration-300 ease-out border border-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              Reset Filters
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {/* Search Input */}
            <div className="relative w-full col-span-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
              <Input
                placeholder="Search by name, city, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-10 text-sm bg-white border border-blue-200 rounded-md focus:ring-blue-600 focus:outline-none focus:border-none"
              />
            </div>

            {/* Location Filter */}
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
                <SelectItem value="dubai" className="px-3 py-2 hover:bg-gray-50">Dubai</SelectItem>
                <SelectItem value="mumbai" className="px-3 py-2 hover:bg-gray-50">Mumbai</SelectItem>
                <SelectItem value="bangalore" className="px-3 py-2 hover:bg-gray-50">Bangalore</SelectItem>
                <SelectItem value="delhi" className="px-3 py-2 hover:bg-gray-50">Delhi NCR</SelectItem>
                <SelectItem value="abu dhabi" className="px-3 py-2 hover:bg-gray-50">Abu Dhabi</SelectItem>
                <SelectItem value="sharjah" className="px-3 py-2 hover:bg-gray-50">Sharjah</SelectItem>
              </SelectContent>
            </Select>

            {/* Experience Filter */}
            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
                <SelectItem value="0-2" className="px-3 py-2 hover:bg-gray-50">0-2 years</SelectItem>
                <SelectItem value="3-5" className="px-3 py-2 hover:bg-gray-50">3-5 years</SelectItem>
                <SelectItem value="5+" className="px-3 py-2 hover:bg-gray-50">5+ years</SelectItem>
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            {/* <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
                <SelectItem value="4+" className="px-3 py-2 hover:bg-gray-50">4+ stars</SelectItem>
                <SelectItem value="3+" className="px-3 py-2 hover:bg-gray-50">3+ stars</SelectItem>
                <SelectItem value="2+" className="px-3 py-2 hover:bg-gray-50">2+ stars</SelectItem>
              </SelectContent>
            </Select> */}

            {/* Services Filter */}
            {/* <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
                <SelectValue placeholder="Services" />
              </SelectTrigger>
              <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
                <SelectItem value="residential" className="px-3 py-2 hover:bg-gray-50">Residential</SelectItem>
                <SelectItem value="commercial" className="px-3 py-2 hover:bg-gray-50">Commercial</SelectItem>
                <SelectItem value="luxury residential" className="px-3 py-2 hover:bg-gray-50">Luxury Residential</SelectItem>
                <SelectItem value="property maintenance" className="px-3 py-2 hover:bg-gray-50">Property Maintenance</SelectItem>
                <SelectItem value="tech office spaces" className="px-3 py-2 hover:bg-gray-50">Tech Office Spaces</SelectItem>
                <SelectItem value="property analytics" className="px-3 py-2 hover:bg-gray-50">Property Analytics</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredManagers.length} property managers found
          </div>
        </div>

        {/* Property Manager Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredManagers.length > 0 ? (
            filteredManagers.map(renderManagerCard)
          ) : (
            <div className="py-8 text-center col-span-full">
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
        <DialogContent className="w-full max-w-md p-6 bg-white border border-blue-100 shadow-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="mb-4 text-2xl font-bold text-blue-900">
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
                <SelectTrigger className="w-full px-3 py-2 text-sm transition bg-white border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
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
                className="w-full h-32 p-3 text-sm bg-transparent border rounded-md shadow-none resize-none focus:outline-none"
              />

            </div>

            {/* Send Button */}
            <Button
              onClick={() => {
                setShowInviteModal(false); // Close modal
                toast.success("Invitation sent successfully"); // Show toast
              }}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
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