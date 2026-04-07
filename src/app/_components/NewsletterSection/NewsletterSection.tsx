import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function NewsletterSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Get the Freshest Updates Delivered Free
                </h2>
                <p className="text-mute mb-8">
                    Subscribe to our newsletter for exclusive deals, new
                    arrivals, and special offers.
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 rounded-full py-3 px-5 border border-mute-light bg-mute-lightest text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <button className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm flex items-center gap-2 shrink-0 cursor-pointer">
                        Subscribe
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="w-3.5"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
