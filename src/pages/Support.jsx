import { Accordion, AccordionItem } from '../components/ui/accordion';

export default function Support() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      <p>FAQ</p>
      <Accordion>
        <AccordionItem
          title={
            <span className="flex items-center">
              <span className="mr-2">What is TruFlo?</span>
            </span>
          }
        >
          We are trying to be the first productivity app that understands your mood to help you break free from distractions and unproductive habits.
        </AccordionItem>
        <AccordionItem
          title={
            <span className="flex items-center">
              <span className="mr-2">Who is TruFlo for?</span>
            </span>
          }
        >
          Anyone who is trying to build productive habits, but mainly for 16-35 year olds.
        </AccordionItem>
        <AccordionItem
          title={
            <span className="flex items-center">
              <span className="mr-2">How does TruFlo work?</span>
            </span>
          }
        >
          The tasks and goals given to you will adapt to your unique day-to-day patterns with AI Personalization.
        </AccordionItem>
      </Accordion>
    </div>
  );
}