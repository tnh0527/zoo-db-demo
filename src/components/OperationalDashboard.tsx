import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, MapPin } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

// Generate daily activities that rotate based on the day
const getTodaysSchedule = () => {
  const allActivities = [
    { time: "9:00 AM", activity: "Zoo Opens - Morning Welcome", location: "Main Entrance" },
    { time: "9:30 AM", activity: "Sea Lion Feeding", location: "Aquatic Center - Zone B" },
    { time: "10:00 AM", activity: "Giraffe Encounter", location: "African Savanna - Zone A" },
    { time: "10:30 AM", activity: "Primate Enrichment Activity", location: "Primate Forest - Zone A" },
    { time: "11:00 AM", activity: "Lion Feeding Time", location: "Big Cat Territory - Zone A" },
    { time: "11:30 AM", activity: "Reptile House Tour", location: "Reptile House - Zone B" },
    { time: "12:00 PM", activity: "Tropical Birds Flying Show", location: "Bird Sanctuary - Zone C" },
    { time: "12:30 PM", activity: "Penguin Parade", location: "Arctic Tundra - Zone B" },
    { time: "1:00 PM", activity: "Sea Lion Splash", location: "Aquatic Center - Zone B" },
    { time: "1:30 PM", activity: "Panda Feeding Time", location: "Asian Bamboo Grove - Zone D" },
    { time: "2:00 PM", activity: "Elephant Enrichment", location: "African Savanna - Zone A" },
    { time: "2:30 PM", activity: "Kangaroo Feeding Time", location: "Australian Outback - Zone C" },
    { time: "3:00 PM", activity: "Conservation Talk", location: "Education Center" },
    { time: "3:30 PM", activity: "Monkey Mischief Show", location: "Primate Forest - Zone A" },
    { time: "4:00 PM", activity: "Bear Country Talk", location: "North American Wilderness - Zone D" },
    { time: "4:30 PM", activity: "Otter Playtime", location: "Aquatic Center - Zone B" },
    { time: "5:00 PM", activity: "Desert Sunset Tour", location: "Desert Oasis - Zone D" },
    { time: "5:30 PM", activity: "Evening Animal Rounds", location: "Various Locations" }
  ];
  
  // Randomize but consistently based on the day
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const seed = dayOfYear;
  
  // Simple shuffle with seed for consistency within the same day
  const shuffled = [...allActivities];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (seed * (i + 1)) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return 12 activities for the day
  return shuffled.slice(0, 12).sort((a, b) => {
    const timeA = parseInt(a.time.replace(/[^\d]/g, ''));
    const timeB = parseInt(b.time.replace(/[^\d]/g, ''));
    return timeA - timeB;
  });
};

export function OperationalDashboard() {
  const todaysSchedule = getTodaysSchedule();
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Today's Activities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out all the exciting activities and experiences happening today at the zoo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {todaysSchedule.map((item, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="min-w-[90px]">
                          <span className="font-medium text-green-700">{item.time}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.activity}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
