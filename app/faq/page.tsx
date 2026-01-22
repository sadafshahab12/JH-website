const FAQ = () => (
  <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto animate-fade-in">
    <h1 className="text-3xl font-vogue text-stone-900 mb-12 text-center">
      Frequently Asked Questions (FAQ)
    </h1>

    <div className="space-y-8">
      {[
        {
          q: "How long does shipping take for print-on-demand apparel?",
          a: "As a print-on-demand brand, we manufacture each item after it is ordered. Production time is typically 2–4 business days. Once shipped, domestic delivery usually takes 5–10 business days. International shipping times vary by country and customs.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes! We ship worldwide. Shipping rates and delivery time depend on your location. You can view accurate shipping options at checkout. We also offer tracking on all orders.",
        },
        {
          q: "What is your return and exchange policy?",
          a: "Because each product is made to order, we do not accept returns for change of mind or size exchanges. If your item arrives defective or printed incorrectly, please contact us within 30 days. We will provide a free replacement or refund based on the case.",
        },
        {
          q: "How do I choose the right size?",
          a: "Our apparel follows standard international sizing. Most tees are unisex fit unless labeled ‘Oversized’. We recommend checking the Size Guide on each product page for exact measurements. If you prefer a looser fit, size up.",
        },
        {
          q: "How should I wash and care for printed clothing?",
          a: "To keep your print looking fresh, wash inside out in cold water and hang dry. Avoid using bleach and do not iron directly on the print. For best results, tumble dry low or air dry.",
        },
      ].map((item, i) => (
        <div key={i} className="border-b border-stone-100 pb-6">
          <h3 className="text-lg font-medium text-stone-800 mb-2">{item.q}</h3>
          <p className="text-stone-500 font-light leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FAQ;
