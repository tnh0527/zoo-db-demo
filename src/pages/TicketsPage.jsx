import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { currentUser } from "../data/mockData";
import { usePricing } from "../data/PricingContext";

const comparisonFeatures = [
  {
    feature: "Zoo Admission",
    dayPass: "Single Day",
    membership: "Unlimited Year-Round",
  },
  { feature: "Parking", dayPass: "$10 per visit", membership: "Free" },
  { feature: "Shopping & Dining Discount", dayPass: "None", membership: "Yes" },
  { feature: "Guest Passes", dayPass: false, membership: "4 per year" },
  { feature: "Member Magazine", dayPass: false, membership: "Quarterly" },
  { feature: "Member Preview Hours", dayPass: false, membership: "Yes" },
  { feature: "Behind-the-Scenes Tours", dayPass: false, membership: "Yes" },
];

export function TicketsPage({ onNavigate, addToCart }) {
  const { ticketPrices: prices, membershipPrice } = usePricing();

  // Define ticket pricing using context prices
  const ticketPrices = [
    {
      id: "adult",
      type: "Adult Day Pass",
      price: prices.adult,
      description: "Full day access for adults (ages 13+)",
    },
    {
      id: "child",
      type: "Child Day Pass",
      price: prices.child,
      description: "Full day access for children (ages 3-12)",
    },
    {
      id: "student",
      type: "Student Day Pass",
      price: prices.student,
      description: "Full day access for students (with valid ID)",
    },
    {
      id: "senior",
      type: "Senior Day Pass",
      price: prices.senior,
      description: "Full day access for seniors (ages 65+)",
    },
  ];

  const handleBuyTicket = (ticket) => {
    if (!currentUser) {
      if (onNavigate) {
        onNavigate("login");
      }
    } else if (addToCart) {
      // Use consistent IDs based on ticket type
      const ticketIdMap = {
        adult: 9001,
        child: 9002,
        student: 9003,
        senior: 9004,
      };

      addToCart({
        id: ticketIdMap[ticket.id],
        name: ticket.type,
        price: ticket.price,
        type: "item",
      });
      toast.success(`Added ${ticket.type} to cart!`);
    }
  };

  const scrollToDayPasses = () => {
    // Scroll to the day passes section
    const dayPassesSection = document.getElementById("day-passes");
    if (dayPassesSection) {
      dayPassesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBecomeMember = () => {
    if (!currentUser) {
      if (onNavigate) {
        onNavigate("login");
      }
    } else if (addToCart) {
      // Add membership to cart using pricing context
      addToCart({
        id: 9000, // Unique ID for membership
        name: "Annual Membership",
        price: membershipPrice,
        type: "item",
      });
      toast.success("Added Annual Membership to cart!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl mb-4">Tickets & Pricing</h1>
          <p className="text-xl text-green-100 max-w-2xl">
            Choose the perfect ticket option for your visit. From single-day
            passes to annual memberships, we have something for everyone!
          </p>
        </div>
      </section>

      {/* Day Passes */}
      <section id="day-passes" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl mb-8 text-center">Day Passes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {ticketPrices.map((ticket) => (
              <Card
                key={ticket.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl mb-2">{ticket.type}</CardTitle>
                  <div className="text-4xl text-green-600 font-semibold">
                    ${(ticket.price ?? 0).toFixed(2)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">
                    {ticket.description}
                  </p>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                    onClick={() => handleBuyTicket(ticket)}
                  >
                    Add Pass
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Comparison */}
      <section id="memberships" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl mb-4 text-center">
            Day Pass vs Annual Membership
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Compare the benefits and see which option is best for you!
          </p>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
              {/* Header Row */}
              <div className="bg-gray-50 p-6 border-b-2 border-gray-200">
                <h3 className="text-xl font-semibold">Features</h3>
              </div>
              <div className="bg-green-50 p-6 border-b-2 border-l-2 border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-green-800">
                  Day Pass
                </h3>
              </div>
              <div className="bg-green-600 p-6 border-b-2 border-l-2 border-gray-200 text-center">
                <h3 className="text-xl font-semibold text-white">
                  Annual Membership
                </h3>
                <p className="text-3xl text-white font-semibold mt-2">
                  ${(membershipPrice ?? 0).toFixed(2)}
                </p>
                <p className="text-sm text-green-100">per year</p>
              </div>

              {/* Feature Rows */}
              {comparisonFeatures.map((item, index) => (
                <div key={index} className="contents">
                  <div
                    className={`p-4 border-b border-gray-200 flex items-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="font-medium">{item.feature}</span>
                  </div>
                  <div
                    className={`p-4 border-b border-l-2 border-gray-200 text-center ${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    {typeof item.dayPass === "boolean" ? (
                      item.dayPass ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700">{item.dayPass}</span>
                    )}
                  </div>
                  <div
                    className={`p-4 border-b border-l-2 border-gray-200 text-center ${
                      index % 2 === 0 ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    {typeof item.membership === "boolean" ? (
                      item.membership ? (
                        <Check className="h-5 w-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-700 font-medium">
                        {item.membership}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* CTA Row */}
              <div className="p-6 border-t-2 border-gray-200 bg-gray-50"></div>
              <div className="p-6 border-t-2 border-l-2 border-gray-200 bg-green-50">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 cursor-pointer"
                  onClick={scrollToDayPasses}
                >
                  Buy Day Pass
                </Button>
              </div>
              <div className="p-6 border-t-2 border-l-2 border-gray-200 bg-green-600">
                <Button
                  className="w-full bg-white text-green-600 hover:bg-gray-100 cursor-pointer"
                  onClick={handleBecomeMember}
                >
                  Become a Member
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
