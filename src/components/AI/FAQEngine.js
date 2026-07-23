import faqData from '@/data/faq.json';

export const processUserMessage = (inputMessage) => {
  if (!inputMessage || typeof inputMessage !== 'string') {
    return {
      text: "I'm here to help! Feel free to ask about Invisalign®, Dental Implants, Clinic Timings, Location, or Booking an Appointment.",
      actions: [{ type: 'book_appointment', label: '📅 Book Appointment' }]
    };
  }

  const normalized = inputMessage.toLowerCase().trim();

  // 1. Tooth Pain / Emergency Intent
  if (normalized.match(/pain|toothache|hurt|swelling|bleeding|emergency|broken tooth|decay|ache/i)) {
    return {
      text: "I'm sorry to hear you're experiencing pain or discomfort! 🦷\n\nWe strongly recommend booking a priority dental consultation so our specialists can evaluate and relieve your pain safely and comfortably.",
      actions: [
        { type: 'book_appointment', label: '📅 Book Emergency Appointment' },
        { type: 'whatsapp', label: '💬 Chat on WhatsApp' }
      ]
    };
  }

  // 2. Pricing / Cost Intent
  if (normalized.match(/cost|price|pricing|fee|rate|how much|charges|expensive|budget/i)) {
    return {
      text: "Treatment cost depends on individual requirements. Please book a consultation for a personalized treatment plan.",
      actions: [
        { type: 'book_appointment', label: '📅 Book Consultation' },
        { type: 'whatsapp', label: '💬 Speak with Reception' }
      ]
    };
  }

  // 3. Location / Address / Maps Intent
  if (normalized.match(/location|address|where|directions|map|located|branch|branches|tiruppur|salem|madurai|bangalore|sivakasi/i)) {
    let branchDetails = "";
    if (normalized.includes("salem")) {
      branchDetails = "📍 Salem Branch: 45, Five Roads Junction, Fairlands, Salem - 636016";
    } else if (normalized.includes("madurai")) {
      branchDetails = "📍 Madurai Branch: 88, KK Nagar Main Road, Madurai - 625020";
    } else if (normalized.includes("bangalore")) {
      branchDetails = "📍 Bangalore Branch: 204, 100 Feet Road, Indiranagar, Bangalore - 560038";
    } else if (normalized.includes("sivakasi")) {
      branchDetails = "📍 Sivakasi Branch: 12, Chairman Shanmugam Road, Sivakasi - 626123";
    } else {
      branchDetails = `📍 Main Flagship Clinic:\n${faqData.clinic_info.main_address}\n\nWe also have branches in Salem, Madurai, Bangalore, and Sivakasi!`;
    }

    return {
      text: `${branchDetails}\n\nPhone: ${faqData.clinic_info.phone}`,
      actions: [
        { type: 'google_maps', label: '📍 Open Google Maps', url: faqData.clinic_info.google_maps_url },
        { type: 'book_appointment', label: '📅 Book Appointment' }
      ]
    };
  }

  // 4. Clinic Timings / Hours Intent
  if (normalized.match(/timing|timings|time|hours|opening|open|close|closing|sunday|today|schedule/i)) {
    return {
      text: `⏰ LARA Smiles Business Hours:\n\n• ${faqData.clinic_info.timings.weekdays}\n• ${faqData.clinic_info.timings.sunday}\n\nWalk-in consultations and scheduled appointments are available during operating hours.`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Appointment' }
      ]
    };
  }

  // 5. Speak to Human / WhatsApp / Contact Intent
  if (normalized.match(/talk|human|reception|receptionist|speak|person|chat|contact|phone|call|whatsapp/i)) {
    return {
      text: "You can chat directly with our front desk reception team on WhatsApp or give us a call at +91 93849 59626.",
      actions: [
        { type: 'whatsapp', label: '💬 Chat on WhatsApp' },
        { type: 'call', label: '📞 Call Clinic', url: `tel:${faqData.clinic_info.phone}` }
      ]
    };
  }

  // 6. Appointment / Booking Intent
  if (normalized.match(/appointment|book|consultation|booking|reserve|slot|visit/i)) {
    return {
      text: "We would love to welcome you to LARA Smiles! Click below to schedule your appointment or consultation.",
      actions: [
        { type: 'book_appointment', label: '📅 Book Appointment' },
        { type: 'whatsapp', label: '💬 Book via WhatsApp' }
      ]
    };
  }

  // 7. Treatment Specific Matches
  if (normalized.match(/invisalign|aligner|clear braces|invisible braces/i)) {
    const t = faqData.treatments.invisalign;
    return {
      text: `🦷 **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Invisalign® Scan' }
      ]
    };
  }

  if (normalized.match(/implant|implants|missing tooth|replace tooth/i)) {
    const t = faqData.treatments.implants;
    return {
      text: `🦷 **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Implant Consultation' }
      ]
    };
  }

  if (normalized.match(/smile makeover|transformation|smile design/i)) {
    const t = faqData.treatments.smile_makeover;
    return {
      text: `😁 **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book 3D Smile Design' }
      ]
    };
  }

  if (normalized.match(/veneer|veneers|porcelain/i)) {
    const t = faqData.treatments.veneers;
    return {
      text: `✨ **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Veneers Consultation' }
      ]
    };
  }

  if (normalized.match(/whitening|bleaching|yellow|stain|brighten/i)) {
    const t = faqData.treatments.whitening;
    return {
      text: `✨ **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Whitening Session' }
      ]
    };
  }

  if (normalized.match(/root canal|rct|rotary|nerve/i)) {
    const t = faqData.treatments.root_canal;
    return {
      text: `🦷 **${t.title}**\n\n${t.summary}\n\n✨ **Key Benefits:**\n• ${t.benefits.join('\n• ')}`,
      actions: [
        { type: 'book_appointment', label: '📅 Book Painless Root Canal' }
      ]
    };
  }

  // 8. Keyword Scored Search against FAQs in faq.json
  let bestMatch = null;
  let maxScore = 0;

  faqData.faqs.forEach((faq) => {
    let score = 0;
    faq.keywords.forEach((keyword) => {
      if (normalized.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    if (score > maxScore) {
      maxScore = score;
      bestMatch = faq;
    }
  });

  if (bestMatch && maxScore > 0) {
    let actions = [{ type: 'book_appointment', label: '📅 Book Appointment' }];
    if (bestMatch.intent === 'location') {
      actions.unshift({ type: 'google_maps', label: '📍 Open Google Maps', url: faqData.clinic_info.google_maps_url });
    } else if (bestMatch.intent === 'whatsapp') {
      actions.unshift({ type: 'whatsapp', label: '💬 Chat on WhatsApp' });
    }
    return {
      text: bestMatch.answer,
      actions
    };
  }

  // 9. Default Fallback
  return {
    text: "Thank you for asking! LARA Smiles offers world-class cosmetic, orthodontic, and restorative dental care.\n\nFor personalized advice or to schedule a visit, our dental team would be delighted to assist you.",
    actions: [
      { type: 'book_appointment', label: '📅 Book Consultation' },
      { type: 'whatsapp', label: '💬 Chat on WhatsApp' }
    ]
  };
};
