import { useState, useMemo } from 'react';
import './Pricing.css';

const DAYS_PER_MONTH = 30;

const RATES = [
  { id: '1year', label: '1 year', rate: 45 },
  { id: '6months', label: '6 months', rate: 50 },
  { id: '3months', label: '3 months', rate: 60 },
  { id: '1month', label: '1 month', rate: 70 },
  { id: 'less', label: 'Less than 1 month', rate: 75 },
];

const INSURANCE_PERCENT = 8;
const DELIVERY_SETUP_FEE = 350;
const CONTRACTS_LESS_THAN_3_MONTHS = ['1month', 'less'];
const LESS_THAN_A_WEEK_FLAT_HIRE = 500;
const QUOTE_STORAGE_KEY = 'ozzys_quote_request';
const QUOTE_EVENT = 'ozzys:quote-request';

export default function Pricing() {
  const [contractId, setContractId] = useState('1year');
  const [daysLessThanMonth, setDaysLessThanMonth] = useState(7);
  const [deliverySelected, setDeliverySelected] = useState(false);

  const rate = RATES.find((r) => r.id === contractId)?.rate ?? 70;
  const quote = useMemo(() => {
    const days = contractId === 'less' ? daysLessThanMonth : DAYS_PER_MONTH;

    // Determine which flat hire applies
    let useFlatHire = false;
    let flatHireAmount = 0;
    if (contractId === 'less' && days < 7) {
      useFlatHire = true;
      flatHireAmount = LESS_THAN_A_WEEK_FLAT_HIRE;
    }

    const hire = useFlatHire ? flatHireAmount : rate * days;
    const subtotal = Math.round(hire * 100) / 100;
    const insurance = Math.round((subtotal * INSURANCE_PERCENT) / 100 * 100) / 100;
    const canChooseDelivery = CONTRACTS_LESS_THAN_3_MONTHS.includes(contractId);
    const deliveryFee = canChooseDelivery && deliverySelected ? DELIVERY_SETUP_FEE : 0;
    const total = subtotal + insurance + deliveryFee;
    return {
      subtotal,
      insurance,
      deliveryFee,
      total,
      rate,
      days,
      useFlatHire,
      flatHireAmount,
      canChooseDelivery,
      contractLabel: RATES.find((r) => r.id === contractId)?.label ?? 'Custom',
    };
  }, [rate, contractId, daysLessThanMonth, deliverySelected]);

  function handleRequestQuote() {
    const deliveryLine = quote.deliveryFee > 0
      ? `\n- Delivery, setup & installation (one-off): $${quote.deliveryFee}`
      : (quote.canChooseDelivery ? '\n- Delivery/setup: Self pickup (no delivery fee)' : '');
    const hireLine = contractId === 'less'
      ? (
        quote.useFlatHire
          ? `- Hire: Flat $${quote.flatHireAmount} (${quote.days} days)`
          : `- Hire: ${quote.days} days × $${quote.rate} = $${quote.subtotal.toFixed(2)} (ex GST)`
      )
      : `- Monthly hire (ex GST): $${(quote.subtotal + quote.insurance).toFixed(2)} (hire $${quote.subtotal.toFixed(2)} + insurance $${quote.insurance.toFixed(2)})`;
    const text = `Quote request:\n- Contract: ${quote.contractLabel}\n- Rate: $${quote.rate} per day\n${hireLine}\n- Insurance (8%): $${quote.insurance.toFixed(2)}${deliveryLine}\n- Total (ex GST): $${quote.total.toFixed(2)}\n\nI would like to proceed with this quote.`;
    try {
      sessionStorage.setItem(QUOTE_STORAGE_KEY, text);
    } catch {}
    // <Contact> is already mounted, so its mount-time reader has long since run.
    // This tells it to pick up the quote we just wrote, then scroll + focus.
    // The event carries the text too, so it works even when sessionStorage is
    // unavailable (private mode, storage disabled).
    window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: text }));
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="pricing-header">
          <h2>VMS sign hire &amp; LED trailer sign hire rates</h2>
          <p className="pricing-sub">
            Transparent daily rates for VMS sign hire, LED trailer sign hire and LED screen trailer hire in
            Melbourne. All prices exclude GST. Insurance is 8% of hire.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Contract length</th>
                  <th>Per day</th>
                  <th>Approx. monthly</th>
                </tr>
              </thead>
              <tbody>
                {RATES.map(({ id, label, rate: r }) => (
                  <tr key={id}>
                    <td>{label}</td>
                    <td>${r} <span className="pricing-table-note">ex GST</span></td>
                    <td>${(r * DAYS_PER_MONTH).toLocaleString()} <span className="pricing-table-note">ex GST</span></td>
                  </tr>
                ))}
                <tr className="pricing-highlight">
                  <td>1–6 days</td>
                  <td colSpan={2}>
                    Flat ${LESS_THAN_A_WEEK_FLAT_HIRE} + insurance (8%) <span className="pricing-table-note">ex GST</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="pricing-notes">
              Monthly figures based on 30 days. Delivery, setup &amp; installation is an optional one-off $350 fee for rentals less than 3 months (self pickup available).
              1–6 days is a flat ${LESS_THAN_A_WEEK_FLAT_HIRE}, plus insurance (8%), all prices exclude GST. A standard 10A power point (a normal household socket) is provided by the client for longer hires. Insurance is 8% of total hire price.
            </p>
          </div>

          <div className="quote-calc">
            <h3>Get a quote</h3>
            <div className="quote-calc-field">
              <label htmlFor="contract">Contract length</label>
              <select
                id="contract"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
              >
                {RATES.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>
            {CONTRACTS_LESS_THAN_3_MONTHS.includes(contractId) && (
              <div className="quote-calc-field">
                <label>Delivery / setup</label>
                <div className="quote-radio-group" role="radiogroup" aria-label="Delivery and setup option">
                  <label className="quote-radio">
                    <input
                      type="radio"
                      name="delivery"
                      checked={!deliverySelected}
                      onChange={() => setDeliverySelected(false)}
                    />
                    Self pickup (no fee)
                  </label>
                  <label className="quote-radio">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliverySelected}
                      onChange={() => setDeliverySelected(true)}
                    />
                    Delivery, setup &amp; installation (+${DELIVERY_SETUP_FEE})
                  </label>
                </div>
              </div>
            )}
            {contractId === 'less' && (
              <div className="quote-calc-field">
                <label htmlFor="days">Number of days</label>
                <input
                  id="days"
                  type="number"
                  min="1"
                  max="29"
                  value={daysLessThanMonth}
                  onChange={(e) => setDaysLessThanMonth(Math.max(1, Math.min(29, parseInt(e.target.value, 10) || 1)))}
                />
              </div>
            )}
            <div className="quote-calc-summary">
              <div className="quote-row">
                <span>
                  {quote.useFlatHire ? `Hire (flat, ${quote.days} days)` : `Hire (${quote.days} days × $${quote.rate})`}
                </span>
                <span>${quote.subtotal.toFixed(2)} <small>ex GST</small></span>
              </div>
              <div className="quote-row">
                <span>Insurance (8%)</span>
                <span>${quote.insurance.toFixed(2)}</span>
              </div>
              {quote.deliveryFee > 0 && (
                <div className="quote-row">
                  <span>Delivery, setup &amp; installation (one-off)</span>
                  <span>${quote.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="quote-row quote-row-total">
                <span>{quote.deliveryFee > 0 ? 'Total' : 'Monthly price'}</span>
                <span>
                  ${quote.total.toFixed(2)} <small>ex GST</small>
                </span>
              </div>
            </div>
            <button type="button" className="btn btn-primary btn-full" onClick={handleRequestQuote}>
              Request this quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { QUOTE_STORAGE_KEY, QUOTE_EVENT };
