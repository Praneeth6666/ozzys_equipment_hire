import { useState, useMemo } from 'react';
import './Pricing.css';

const DAYS_PER_MONTH = 30;

const RATES = [
  { id: '1year', label: '1 year', rate: 60 },
  { id: '6months', label: '6 months', rate: 70 },
  { id: '3months', label: '3 months', rate: 80 },
  { id: '1month', label: '1 month', rate: 90 },
  { id: 'less', label: 'Less than 1 month', rate: 95 },
];

const INSURANCE_PERCENT = 8;
const DELIVERY_SETUP_FEE = 350;
const CONTRACTS_LESS_THAN_3_MONTHS = ['1month', 'less'];
const QUOTE_STORAGE_KEY = 'ozzys_quote_request';

export default function Pricing() {
  const [contractId, setContractId] = useState('1month');
  const [daysLessThanMonth, setDaysLessThanMonth] = useState(7);

  const rate = RATES.find((r) => r.id === contractId)?.rate ?? 70;
  const quote = useMemo(() => {
    const days = contractId === 'less' ? daysLessThanMonth : DAYS_PER_MONTH;
    const subtotal = Math.round(rate * days * 100) / 100;
    const insurance = Math.round((subtotal * INSURANCE_PERCENT) / 100 * 100) / 100;
    const deliveryFee = CONTRACTS_LESS_THAN_3_MONTHS.includes(contractId) ? DELIVERY_SETUP_FEE : 0;
    const total = subtotal + insurance + deliveryFee;
    return {
      subtotal,
      insurance,
      deliveryFee,
      total,
      rate,
      days,
      contractLabel: RATES.find((r) => r.id === contractId)?.label ?? 'Custom',
    };
  }, [rate, contractId, daysLessThanMonth]);

  function handleRequestQuote() {
    const deliveryLine = quote.deliveryFee > 0 ? `\n- Delivery, setup & installation (one-off): $${quote.deliveryFee}` : '';
    const hireLine = contractId === 'less'
      ? `- Hire: ${quote.days} days × $${quote.rate} = $${quote.subtotal.toFixed(2)} (ex GST)`
      : `- Monthly hire (ex GST): $${(quote.subtotal + quote.insurance).toFixed(2)} (hire $${quote.subtotal.toFixed(2)} + insurance $${quote.insurance.toFixed(2)})`;
    const text = `Quote request:\n- Contract: ${quote.contractLabel}\n- Rate: $${quote.rate} per day\n${hireLine}\n- Insurance (8%): $${quote.insurance.toFixed(2)}${deliveryLine}\n- Total (ex GST): $${quote.total.toFixed(2)}\n\nI would like to proceed with this quote.`;
    try {
      sessionStorage.setItem(QUOTE_STORAGE_KEY, text);
    } catch (_) {}
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="pricing-header">
          <h2>Hire rates</h2>
          <p className="pricing-sub">
            Monthly pricing by contract length. All prices exclude GST. Insurance is 8% of hire.
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
              </tbody>
            </table>
            <p className="pricing-notes">
              Monthly figures based on 30 days. Delivery, setup &amp; installation: one-off $350 fee for rentals less than 3 months.
              15Amp connection to be provided by client. Insurance is 8% of total hire price.
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
                <span>Hire ({quote.days} days × ${quote.rate})</span>
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
                <span>${quote.total.toFixed(2)} <small>ex GST</small></span>
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

export { QUOTE_STORAGE_KEY };
