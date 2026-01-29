import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2, Users, Target, CheckCircle2, Sparkles } from "lucide-react";

const JobOffer = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
            <span>Ambroziak Consulting Recruitment Solutions</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Business Development Representative / Sales Manager
          </h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>PriceMind</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Warsaw / Remote (Hybrid)</span>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Badge variant="secondary">B2B Sales</Badge>
            <Badge variant="secondary">CEE Region</Badge>
            <Badge variant="secondary">SaaS</Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* About Company */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              About PriceMind
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <p>
              <a href="https://www.pricemind.eu/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                PriceMind
              </a>{" "}
              is a trusted provider of pricing software services and IT solutions for pricing management. 
              It supports large companies across retail, distribution, and manufacturing sectors in optimizing 
              their pricing processes and increasing profitability.
            </p>
            <p className="mt-4">
              So far, PriceMind has operated as a software integrator (providing both implementation and development 
              services) exclusively for Pricefx - a cloud-based SaaS pricing platform. The company is now in the 
              process of extending its partner network with three other SaaS pricing solution providers. PriceMind 
              will act for all four partners not only as an implementation specialist, but also as a value-added 
              re-seller of SaaS solutions, focusing its sales activities on the CEE region.
            </p>
          </CardContent>
        </Card>

        {/* What you will be doing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              What You Will Be Doing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              As a BD Representative / Sales Manager, you will work closely with PriceMind's Founder and CEO 
              to identify and effectively reach new clients across the CEE region, establish contact with 
              decision makers and open the sales opportunity (i.e. organize discovery calls / meetings).
            </p>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Identification and prioritization of target companies and decision makers:
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Find the largest companies per pre-defined market/sector and geography
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Gather information on pricing needs and tools used by identified target companies
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Find companies with unmet needs or actively searching pricing solutions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Identify decision makers such as revenue manager or pricing manager
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Understand decision makers' view on the pricing solutions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Prioritize communication channels with identified contacts
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Establishing contacts with target companies – effective lead generation:
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Refine necessary lead generation tools (awareness and interest)
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Refine sales messages alongside the marketing team
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Refine presentations and customize them by client
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Prepare cases based on Partners' insight and current client testimonials
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Implement "mass" lead generation campaigns leveraging effective tools and services
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Leverage multiple communication channels to establish contact with decision makers
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Answer initial questions, leading to discovery calls / meetings or demo meetings
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Management of the sales process:
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Manage CRM
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Contract next steps
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Set meeting dates and meeting agendas
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                  Manage all internal and external stakeholders (introductions, reminders, follow-ups)
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              Collection of the client feedback and providing insight to the marketing, sales and technical teams.
            </p>
          </CardContent>
        </Card>

        {/* What you will need */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              What You Will Need
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Sales mentality and goal-oriented mindset
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Experience in large corporate B2B lead generation / selling through digital channels
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                1-3 years in a digital sales function
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Personal maturity to effectively communicate with senior managers in large corporates
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Excellent communication skills (verbal & written) in English
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Experience in working with CRM and other sales tools
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Experience in selling digital solutions
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Ability to work independently and take the lead
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary mt-1 shrink-0" />
                Enthusiasm and commitment
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Nice to Have:
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground/50 mt-1 shrink-0" />
                  Proven track record of selling to international / European clients
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground/50 mt-1 shrink-0" />
                  Understanding of pricing tools
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground/50 mt-1 shrink-0" />
                  Understanding of the distribution and manufacturing industries
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Why Join */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">
              PriceMind has already passed the early stage of development and is now dynamically scaling its 
              operations based on its technology and pricing expertise proven in multiple international projects. 
              The organization is lean and expects from all members to take responsibility for the future of PriceMind. 
              Especially for this role, initiative and taking responsibility for lead generation results is crucial. 
              This is a requirement, but also an opportunity for somebody who wants to drive their destiny and 
              enhance their sales career in a local technology company operating internationally.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm pt-4">
          Warsaw, January 16th 2026
        </div>
      </div>
    </div>
  );
};

export default JobOffer;
