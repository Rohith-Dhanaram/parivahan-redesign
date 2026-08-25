import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, Bell, CalendarDays, CheckCircle2, ChevronRight, CircleHelp,
  Clock3, CreditCard, FileCheck2, FileText, Home, MapPin, Menu, Search,
  ShieldCheck, Sparkles, Truck, UserRound, X, AlertCircle, Download,
  CarFront, IdCard, IndianRupee, MessageSquare, LogIn, ClipboardList
} from "lucide-react";
import "./styles.css";

const services = [
  { id:"renew", icon:IdCard, title:"Renew Driving Licence", desc:"Renew an existing licence with a guided checklist.", tag:"Most popular" },
  { id:"newdl", icon:IdCard, title:"Apply for Driving Licence", desc:"Check eligibility and start a new licence application." },
  { id:"vehicle", icon:CarFront, title:"Register a Vehicle", desc:"Register a new vehicle and track your RC." },
  { id:"transfer", icon:Truck, title:"Transfer Vehicle Ownership", desc:"Start an ownership transfer with clear next steps." },
  { id:"challan", icon:ClipboardList, title:"Check & Pay Challan", desc:"View pending traffic challans and payment status." },
  { id:"status", icon:Clock3, title:"Track an Application", desc:"See exactly where your application is right now." },
  { id:"rto", icon:MapPin, title:"Find an RTO", desc:"Find services, address, hours and appointment details." },
  { id:"docs", icon:FileText, title:"Download Documents", desc:"Access your available digital vehicle and licence documents." }
];

const mockNotifications = [
  {title:"Payment received",text:"₹200 was received for your licence renewal.",time:"2 hours ago",tone:"success"},
  {title:"Documents verified",text:"Your documents have been accepted by the system.",time:"2 hours ago",tone:"success"},
  {title:"RTO review in progress",text:"Bengaluru Central RTO is reviewing your application.",time:"1 hour ago",tone:"info"},
  {title:"Action required",text:"Your vehicle registration needs a clearer insurance document.",time:"Yesterday",tone:"warning"}
];

const mockApplications = [
  { id:"DL-2026-18427", title:"Driving Licence Renewal", status:"Waiting for RTO verification", tone:"info", current:3, total:7, next:"Your documents have been accepted. The RTO is reviewing your application.", rto:"Bengaluru Central RTO", eta:"Expected update within 2–4 working days" },
  { id:"RC-2026-09214", title:"Vehicle Registration", status:"Action required from you", tone:"warning", current:2, total:6, next:"Upload a clearer copy of the insurance document to continue.", rto:"Bengaluru East RTO", eta:"Action needed today" }
];

const timeline = [
  ["Application submitted","24 Aug 2026 · 10:42 AM",true],
  ["Documents uploaded","24 Aug 2026 · 10:49 AM",true],
  ["Payment received","24 Aug 2026 · 10:52 AM",true],
  ["Waiting for RTO verification","In progress",false],
  ["Appointment","Not required yet",false],
  ["Approval","Not started",false],
  ["Licence issued","Not started",false]
];

const mockChallans = [
  { id:"CH-KA-260824-1184", date:"18 Aug 2026", place:"Hosur Road, Bengaluru", reason:"Driving without helmet", amount:500, status:"Pending" },
  { id:"CH-KA-260711-0832", date:"11 Jul 2026", place:"MG Road, Bengaluru", reason:"Parking in a no-parking zone", amount:300, status:"Paid" }
];

function Header({onMenu, onHome, onDashboard, onDemo, onNotifications}) {
  return <header className="topbar">
    <div className="brand" onClick={onHome}>
      <div className="brand-mark">P</div>
      <div><strong>Parivahan</strong><span>Citizen Services</span></div>
    </div>
    <nav className="desktop-nav">
      <button onClick={()=>onHome("services")}>Services</button>
      <button onClick={()=>onDashboard()}>My Parivahan</button>
      <button onClick={()=>onHome("rto")}>Find an RTO</button>
      <button onClick={()=>onHome("help")}>Help</button>
      <button className="demo-nav" onClick={onDemo}><Sparkles size={15}/> Demo</button>
    </nav>
    <div className="header-actions">
      <button className="icon-btn" aria-label="Notifications" onClick={onNotifications}><Bell size={19}/><i/></button>
      <button className="account-btn" onClick={()=>onDashboard()}><UserRound size={18}/><span>My Parivahan</span></button>
      <button className="mobile-menu" onClick={onMenu}><Menu/></button>
    </div>
  </header>
}

function StatusBadge({tone="info", children}) { return <span className={"badge "+tone}><span className="dot"/> {children}</span> }

function HomePage({go}) {
  const [query,setQuery] = useState("");
  const filtered = services.filter(s => (s.title+" "+s.desc).toLowerCase().includes(query.toLowerCase()));
  return <div>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><ShieldCheck size={15}/> Government digital services, made simpler</div>
        <h1>What do you want<br/><em>to do?</em></h1>
        <p>Complete driving licence, vehicle and traffic services with clear steps, transparent status and help when you need it.</p>
        <div className="hero-search">
          <Search size={20}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try “renew my driving licence”" />
          {query && <button onClick={()=>setQuery("")}><X size={17}/></button>}
        </div>
        <div className="hero-demo-note"><Sparkles size={14}/><span>Hackathon prototype · explore the full journey with mock data</span></div>
        <div className="quick-links">
          <span>Popular:</span><button onClick={()=>go("renew")}>Renew licence</button><button onClick={()=>go("challan")}>Check challan</button><button onClick={()=>go("status")}>Track application</button>
        </div>
      </div>
      <div className="hero-card">
        <div className="mini-window">
          <div className="mini-head"><span>Application status</span><StatusBadge>In progress</StatusBadge></div>
          <div className="mini-title">Driving Licence Renewal</div>
          <div className="mini-id">DL-2026-18427</div>
          <div className="mini-progress"><span style={{width:"57%"}}/></div>
          <div className="mini-step"><CheckCircle2/> Documents verified <b>✓</b></div>
          <div className="mini-step active"><Clock3/> RTO verification <b>Now</b></div>
          <div className="mini-step muted"><CalendarDays/> Appointment <b>Later</b></div>
          <button className="mini-link" onClick={()=>go("status")}>View full timeline <ArrowRight size={16}/></button>
        </div>
      </div>
    </section>

    <main className="content" id="services">
      <div className="section-head"><div><span className="section-kicker">Services</span><h2>Everything you need, in one place</h2></div><button className="text-btn" onClick={()=>go("dashboard")}>Go to My Parivahan <ArrowRight size={16}/></button></div>
      <div className="service-grid">
        {filtered.map(s => <button className="service-card" key={s.id} onClick={()=>go(s.id)}>
          <div className="service-icon"><s.icon size={23}/></div>
          <div className="service-card-copy"><span className="service-category">{s.id==="challan"?"Traffic":s.id==="rto"?"Support":s.id==="status"?"Applications":s.id==="vehicle"||s.id==="transfer"?"Vehicles":"Driving licence"}</span><div className="service-title">{s.title}</div><p>{s.desc}</p>{s.tag && <span className="popular">{s.tag}</span>}</div>
          <ChevronRight className="service-arrow" size={20}/>
        </button>)}
      </div>

      <section className="track-banner">
        <div className="track-icon"><Clock3/></div>
        <div><span className="section-kicker">Already applied?</span><h3>Track your application</h3><p>See what has happened, what is happening now, and what you need to do next.</p></div>
        <div className="track-input"><input placeholder="Enter application number" defaultValue="DL-2026-18427"/><button onClick={()=>go("status")}>Track <ArrowRight size={17}/></button></div>
      </section>

      <section className="three-col">
        <InfoCard icon={FileCheck2} title="Know what you need" text="See documents, fees, estimated time and RTO visit requirements before you start." action="View requirements" onClick={()=>go("renew")}/>
        <InfoCard icon={MapPin} title="Find your RTO" text="Search by PIN code, city or current location and see services and hours." action="Find an RTO" onClick={()=>go("rto")}/>
        <InfoCard icon={CircleHelp} title="Need help?" text="Search common problems, report an issue or track a support ticket." action="Visit Help Centre" onClick={()=>go("help")}/>
      </section>
    </main>
  </div>
}

function InfoCard({icon:Icon,title,text,action,onClick}) { return <div className="info-card"><div className="info-icon"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action} <ArrowRight size={15}/></button></div> }

function Requirements({go}) {
  return <main className="page">
    <button className="back" onClick={()=>go("home")}>← Back to services</button>
    <div className="page-heading"><div><span className="section-kicker">Driving Licence</span><h1>Renew your driving licence</h1><p>Here’s what you’ll need before you start. The full application takes about 10–15 minutes.</p></div><StatusBadge tone="success">Mostly online</StatusBadge></div>
    <div className="requirements-layout">
      <section className="panel">
        <h2>What you'll need</h2>
        <Requirement text="Existing Driving Licence" />
        <Requirement text="Identity document" />
        <Requirement text="Recent photograph" />
        <Requirement text="Signature" />
        <Requirement text="Medical certificate, if applicable" optional />
        <div className="notice"><Sparkles size={18}/><div><b>Good to know</b><p>You’ll see the exact requirements for your application before you submit anything.</p></div></div>
      </section>
      <aside className="side-stack">
        <div className="summary-card"><div><span>Estimated time</span><b>10–15 min</b></div><div><span>Government fee</span><b>₹200</b></div><div><span>RTO visit</span><b>Only if required</b></div></div>
        <div className="steps-card"><h3>How it works</h3>{["Verify identity","Enter details","Upload documents","Pay fee","RTO verification if required","Licence issued"].map((x,i)=><div className="simple-step" key={x}><span>{i+1}</span>{x}</div>)}</div>
        <button className="primary wide" onClick={()=>go("application")}>Start renewal <ArrowRight size={17}/></button>
      </aside>
    </div>
  </main>
}

function Requirement({text,optional}) { return <div className="requirement"><CheckCircle2 size={20}/><span>{text}</span>{optional&&<small>if applicable</small>}</div> }

function Application({go}) {
  const [step,setStep]=useState(1);
  const [uploaded,setUploaded]=useState(false);
  const [uploadError,setUploadError]=useState(false);
  const [paid,setPaid]=useState(false);
  const [paymentMode,setPaymentMode]=useState("idle");
  const [saved,setSaved]=useState(false);

  const saveProgress=()=>{
    setSaved(true);
    setTimeout(()=>setSaved(false),2200);
  };

  return <main className="page">
    <button className="back" onClick={()=>go("renew")}>← Back</button>
    <div className="application-header">
      <div><span className="section-kicker">Renew Driving Licence</span><h1>Your application</h1><p>Application <b>DL-2026-18427</b> · You can save and return anytime</p></div>
      <div className="header-status-actions">{saved&&<span className="saved-note"><CheckCircle2 size={14}/> Progress saved</span>}<button className="secondary small" onClick={saveProgress}>Save & exit</button><StatusBadge>{step===4?"Ready to submit":"In progress"}</StatusBadge></div>
    </div>
    <div className="stepper">{["Your details","Documents","Payment","Review & submit"].map((x,i)=><div className={"step "+(i+1===step?"current":"")+(i+1<step?" done":"")} key={x}><span>{i+1<step?<CheckCircle2 size={18}/>:i+1}</span><label>{x}</label></div>)}</div>
    <section className="panel application-panel">
      {step===1 && <><h2>Confirm your details</h2><p className="muted">We found these details from your existing licence. Review them before continuing.</p><div className="form-grid"><Field label="Full name" value="Arjun Mehta"/><Field label="Date of birth" value="12 May 1998"/><Field label="Licence number" value="KA01 2020 0048217"/><Field label="Mobile number" value="+91 98•••••214"/></div><div className="action-row"><button className="primary" onClick={()=>setStep(2)}>Continue <ArrowRight size={17}/></button></div></>}

      {step===2 && <><h2>Upload your documents</h2><p className="muted">Files are checked immediately so you don’t discover errors at the end.</p>
        <Upload name="Driving licence" uploaded={true}/>
        <Upload name="Photograph" uploaded={uploaded} error={uploadError} onClick={()=>{setUploadError(false);setUploaded(true)}} onError={()=>{setUploaded(false);setUploadError(true)}}/>
        <Upload name="Signature" uploaded={false}/>
        {uploadError&&<div className="error-box"><AlertCircle/><div><b>File could not be uploaded</b><p>Your photograph is 2.4 MB. The maximum allowed size is 500 KB.</p><button className="text-btn" onClick={()=>window.alert("Mock compression complete. Replace the file to continue.")}>Compress this file <ArrowRight size={14}/></button></div></div>}
        <div className="action-row"><button className="secondary" onClick={()=>setStep(1)}>Back</button><button className="primary" onClick={()=>setStep(3)} disabled={!uploaded}>Continue <ArrowRight size={17}/></button></div>
      </>}

      {step===3 && <><h2>Payment</h2><p className="muted">Government fee for this mock application.</p><div className="payment-box"><div><span>Licence renewal fee</span><b>₹200</b></div><div><span>Transaction</span><span>{paid?"TXN-MOCK-84721":"Will be generated after payment"}</span></div></div>
        {paymentMode==="failed" && <div className="error-box"><AlertCircle/><div><b>Payment verification failed</b><p>Your bank response was not received. Check your payment status before trying again.</p><button className="text-btn" onClick={()=>setPaymentMode("idle")}>Try again <ArrowRight size={14}/></button></div></div>}
        {paymentMode==="reconciling" && <div className="reconcile-box"><Clock3/><div><b>Money deducted — don’t pay again</b><p>Your bank has confirmed the ₹200 payment, but Parivahan is still updating your application. We’ll reconcile it automatically.</p><span>Transaction ID: TXN-MOCK-84721</span></div></div>}
        {paid && <div className="success-box"><CheckCircle2/><div><b>Payment received</b><p>Your payment is confirmed. No further payment is required.</p></div></div>}
        {!paid && paymentMode==="idle" && <div className="payment-actions"><button className="primary" onClick={()=>setPaymentMode("failed")}>Simulate failed payment</button><button className="primary" onClick={()=>{setPaymentMode("reconciling");setTimeout(()=>setPaid(true),1800)}}>Pay ₹200 <CreditCard size={17}/></button></div>}
        {paymentMode==="failed" && <div className="payment-actions"><button className="secondary" onClick={()=>setPaymentMode("idle")}>Cancel</button><button className="primary" onClick={()=>setPaymentMode("reconciling")}>Check payment status</button></div>}
        <div className="action-row"><button className="secondary" onClick={()=>setStep(2)}>Back</button><button className="primary" disabled={!paid} onClick={()=>setStep(4)}>Continue <ArrowRight size={17}/></button></div>
      </>}

      {step===4 && <><h2>Review & submit</h2><div className="review"><ReviewRow label="Service" value="Driving Licence Renewal"/><ReviewRow label="Applicant" value="Arjun Mehta"/><ReviewRow label="Documents" value="3 documents ready"/><ReviewRow label="Payment" value="₹200 · Paid"/><ReviewRow label="RTO visit" value="Only if required"/></div><div className="notice"><ShieldCheck/><div><b>Mock environment</b><p>This prototype does not connect to real government systems or process real payments.</p></div></div><div className="action-row"><button className="secondary" onClick={()=>setStep(3)}>Back</button><button className="primary" onClick={()=>go("status")}>Submit application <ArrowRight size={17}/></button></div></>}
    </section>
  </main>
}
function Field({label,value}) { return <label className="field"><span>{label}</span><input value={value} readOnly/></label> }
function Upload({name,uploaded,onClick,error,onError}) { return <div className={"upload "+(uploaded?"uploaded ":"")+(error?"upload-error":"")}><div className="upload-icon">{uploaded?<CheckCircle2/>:error?<AlertCircle/>:<FileText/>}</div><div><b>{name}</b><p>{uploaded?"JPG · 420 KB · Valid":error?"JPG · 2.4 MB · Too large":"PDF, JPG or PNG · Max 500 KB"}</p></div>{uploaded?<span className="valid">Valid</span>:error?<button className="secondary small" onClick={onClick}>Replace file</button>:<><button className="secondary small" onClick={onClick}>Choose file</button><button className="demo-error-link" onClick={onError}>Test error</button></>}</div> }
function ReviewRow({label,value}) { return <div className="review-row"><span>{label}</span><b>{value}</b></div> }

function StatusPage({go}) {
  return <main className="page">
    <button className="back" onClick={()=>go("home")}>← Back to services</button>
    <div className="page-heading"><div><span className="section-kicker">Application tracking</span><h1>Driving Licence Renewal</h1><p>Application <b>DL-2026-18427</b> · Last updated today at 10:52 AM</p></div><StatusBadge>Waiting for RTO verification</StatusBadge></div>
    <div className="status-grid">
      <section className="panel timeline-panel">
        <div className="panel-title"><h2>Application timeline</h2><span>3 of 7 steps complete</span></div>
        <div className="timeline">{timeline.map((t,i)=><div className={"timeline-item "+(i===3?"current":"")+(t[2]?" completed":"")} key={t[0]}><div className="timeline-marker">{t[2]?<CheckCircle2 size={20}/>:i===3?<Clock3 size={19}/>:<span/>}</div><div className="timeline-content"><b>{t[0]}</b><span>{t[1]}</span>{i===3&&<div className="timeline-callout"><strong>What happens now?</strong><p>The RTO will review your application. You don’t need to do anything right now.</p></div>}</div></div>)}</div>
      </section>
      <aside className="side-stack">
        <div className="next-card"><span className="section-kicker">Your next step</span><h3>No action needed</h3><p>Your documents and payment are complete. We’ll notify you when the RTO verification is finished.</p><div className="next-meta"><Clock3 size={17}/> Expected update within 2–4 working days</div></div>
        <div className="details-card"><h3>Application details</h3><ReviewRow label="Application" value="DL-2026-18427"/><ReviewRow label="RTO" value="Bengaluru Central"/><ReviewRow label="Payment" value="₹200 · Received"/><ReviewRow label="Submitted" value="24 Aug 2026"/></div>
        <button className="secondary wide" onClick={()=>window.alert("Mock receipt downloaded.")}><Download size={17}/> Download receipt</button>
      </aside>
    </div>
  </main>
}

function Dashboard({go}) {
  return <main className="page">
    <div className="dashboard-welcome"><div><span className="section-kicker">My Parivahan</span><h1>Good evening, Arjun</h1><p>Here’s what’s happening with your driving and vehicle services.</p></div><div className="profile-circle">AM</div></div>
    <section className="dashboard-stats">
      <div><span>Active applications</span><b>2</b><small>1 needs your action</small></div>
      <div><span>Registered vehicles</span><b>1</b><small>Registration valid</small></div>
      <div><span>Pending challans</span><b>1</b><small>₹500 due</small></div>
      <div><span>Upcoming appointments</span><b>0</b><small>No visit scheduled</small></div>
    </section>
    <section className="dashboard-grid">
      <div className="dash-main">
        <div className="panel"><div className="panel-title"><h2>Applications</h2><button className="text-btn" onClick={()=>go("status")}>View all <ArrowRight size={15}/></button></div>
          {mockApplications.map(a=><button className="application-card" key={a.id} onClick={()=>go("status")}><div className="app-top"><span className="app-icon"><IdCard size={20}/></span><div><b>{a.title}</b><small>{a.id}</small></div><ChevronRight/></div><StatusBadge tone={a.tone}>{a.status}</StatusBadge><div className="app-bar"><span style={{width:`${a.current/a.total*100}%`}}/></div><p>{a.next}</p></button>)}
        </div>
        <div className="panel"><div className="panel-title"><h2>My vehicles</h2><button className="text-btn" onClick={()=>go("status")}>View all <ArrowRight size={15}/></button></div><div className="vehicle-row"><div className="vehicle-icon"><CarFront/></div><div><b>KA 01 AB 1234</b><span>Maruti Suzuki · Registration valid</span></div><StatusBadge tone="success">Valid</StatusBadge><ChevronRight/></div></div>
      </div>
      <aside className="side-stack"><div className="quick-panel"><h3>Quick actions</h3>{[["Check challan",ClipboardList],["Find an RTO",MapPin],["Download documents",Download],["Get help",CircleHelp]].map(([x,I])=><button key={x} onClick={()=>x==="Find an RTO"?go("rto"):x==="Get help"?go("help"):null}><I size={18}/>{x}<ChevronRight size={16}/></button>)}</div><div className="support-mini"><MessageSquare size={20}/><div><b>Need help?</b><p>We're here when something goes wrong.</p></div><button onClick={()=>go("help")}>Help Centre</button></div></aside>
    </section>
  </main>
}


function ChallanPage({go}) {
  const [selected, setSelected] = useState(null);
  const [paid, setPaid] = useState(false);

  if (selected) {
    const c = selected;
    return <main className="page">
      <button className="back" onClick={()=>{setSelected(null);setPaid(false)}}>← Back to challans</button>
      <div className="page-heading">
        <div><span className="section-kicker">Traffic challan</span><h1>Challan details</h1><p>{c.id} · Issued {c.date}</p></div>
        <StatusBadge tone={c.status==="Paid"||paid?"success":"warning"}>{c.status==="Paid"||paid?"Paid":"Payment due"}</StatusBadge>
      </div>
      <div className="status-grid">
        <section className="panel">
          <h2>{c.reason}</h2>
          <p className="muted">{c.place}</p>
          <div className="review" style={{marginTop:"22px"}}>
            <ReviewRow label="Challan number" value={c.id}/>
            <ReviewRow label="Vehicle" value="KA 01 AB 1234"/>
            <ReviewRow label="Date" value={c.date}/>
            <ReviewRow label="Location" value={c.place}/>
            <ReviewRow label="Violation" value={c.reason}/>
            <ReviewRow label="Amount due" value={`₹${c.amount}`}/>
          </div>
          {c.status==="Pending" && !paid && <div className="notice"><ShieldCheck/><div><b>Secure payment</b><p>This prototype uses mock payment. No real money will be charged.</p></div></div>}
          {paid && <div className="success-box"><CheckCircle2/><div><b>Challan paid successfully</b><p>Mock transaction TXN-CH-48219 has been recorded. Your receipt is ready.</p></div></div>}
          <div className="action-row">
            {c.status==="Pending" && !paid && <button className="primary" onClick={()=>setPaid(true)}>Pay ₹{c.amount} <CreditCard size={17}/></button>}
            {(c.status==="Paid" || paid) && <button className="secondary" onClick={()=>window.alert("Mock receipt downloaded.")}><Download size={17}/> Download receipt</button>}
          </div>
        </section>
        <aside className="side-stack">
          <div className="next-card">
            <span className="section-kicker">Payment status</span>
            <h3>{c.status==="Paid"||paid?"Payment complete":"Payment required"}</h3>
            <p>{c.status==="Paid"||paid ? "No further action is required for this challan." : "Pay the challan online to close it."}</p>
          </div>
          <div className="details-card">
            <h3>Your vehicle</h3>
            <ReviewRow label="Registration" value="KA 01 AB 1234"/>
            <ReviewRow label="Owner" value="Arjun Mehta"/>
          </div>
        </aside>
      </div>
    </main>
  }

  return <main className="page">
    <button className="back" onClick={()=>go("home")}>← Back to services</button>
    <div className="page-heading"><div><span className="section-kicker">Traffic</span><h1>Check & pay challan</h1><p>View pending and paid traffic challans for your vehicle.</p></div></div>
    <div className="rto-search">
      <Search/><input defaultValue="KA 01 AB 1234"/><button className="primary" onClick={()=>window.alert("Showing mock RTO results for your search.")}>Search</button>
    </div>
    <div className="panel">
      <div className="panel-title"><h2>Challans for KA 01 AB 1234</h2><span>2 records</span></div>
      <div className="challan-list">
        {mockChallans.map(c=><button className="challan-row" key={c.id} onClick={()=>setSelected(c)}>
          <div className="challan-main"><div className="challan-icon"><ClipboardList size={19}/></div><div><b>{c.reason}</b><span>{c.id} · {c.date}</span><small>{c.place}</small></div></div>
          <div className="challan-right"><strong>₹{c.amount}</strong><StatusBadge tone={c.status==="Paid"?"success":"warning"}>{c.status==="Paid"?"Paid":"Payment due"}</StatusBadge><ChevronRight size={17}/></div>
        </button>)}
      </div>
    </div>
  </main>
}

function RTOPage() {
  return <main className="page"><div className="page-heading"><div><span className="section-kicker">RTO Finder</span><h1>Find your RTO</h1><p>Search by PIN code, city or state. Mock data is shown for this prototype.</p></div></div><div className="rto-search"><Search/><input defaultValue="Bengaluru"/><button className="primary" onClick={()=>window.alert("Showing mock RTO results for Bengaluru.")}>Search</button></div><div className="rto-grid">{["Bengaluru Central RTO","Bengaluru East RTO","Bengaluru West RTO"].map((x,i)=><div className="rto-card" key={x}><div className="rto-head"><div className="rto-pin"><MapPin/></div><StatusBadge tone="success">Open today</StatusBadge></div><h3>{x}</h3><p>{i===0?"Koramangala, Bengaluru":"Bengaluru, Karnataka"}</p><div className="rto-meta"><span><Clock3 size={15}/> 9:30 AM – 6:00 PM</span><span><CalendarDays size={15}/> Appointments available</span></div><button className="text-btn" onClick={()=>window.alert("RTO details panel coming next in the prototype.")}>View details <ArrowRight size={15}/></button></div>)}</div></main>
}

function HelpPage() {
  const [q,setQ]=useState("");
  const items=["Payment was deducted but application has not updated","My document upload keeps failing","I don't know whether I need to visit an RTO","How do I track my application?"];
  const shown=items.filter(x=>x.toLowerCase().includes(q.toLowerCase()));
  return <main className="page"><div className="help-hero"><span className="section-kicker">Help & Support</span><h1>How can we help?</h1><p>Search common problems or report an issue. Your application details can be attached automatically.</p><div className="hero-search light"><Search/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for a problem or question"/></div></div><div className="help-grid"><section className="panel"><h2>Common problems</h2>{shown.map(x=><button className="help-row" key={x} onClick={()=>window.alert("Mock help article: "+x)}><CircleHelp size={19}/><span>{x}</span><ChevronRight size={17}/></button>)}</section><section className="panel support-form"><h2>Report a technical issue</h2><p className="muted">We’ll automatically attach useful context so you don’t have to explain everything again.</p><div className="attached"><b>Automatically attached</b><span>Application: DL-2026-18427</span><span>Service: Driving Licence Renewal</span><span>Error code: DEMO-PAY-001</span></div><button className="primary wide" onClick={()=>window.alert("Mock support ticket created: SUP-2026-00481")}>Create support ticket <ArrowRight size={17}/></button></section></div></main>
}


function NotificationsPanel({onClose}) {
  return <div className="notification-overlay" onMouseDown={onClose}>
    <div className="notification-panel" onMouseDown={e=>e.stopPropagation()}>
      <div className="notification-head"><div><span className="section-kicker">Updates</span><h2>Notifications</h2></div><button className="icon-btn" onClick={onClose}><X size={19}/></button></div>
      <div className="notification-list">{mockNotifications.map((n,i)=><div className="notification-item" key={i}><div className={"notification-dot "+n.tone}></div><div><b>{n.title}</b><p>{n.text}</p><small>{n.time}</small></div></div>)}</div>
      <div className="notification-foot">You’re all caught up. Notifications are mock data for this prototype.</div>
    </div>
  </div>
}

function DemoPanel({onClose,go}) {
  return <div className="demo-overlay" onMouseDown={onClose}>
    <div className="demo-modal" onMouseDown={e=>e.stopPropagation()}>
      <div className="demo-modal-head">
        <div><span className="section-kicker">Hackathon demo</span><h2>Show the redesign in 3 minutes</h2><p>These journeys use safe mock data and demonstrate the product's core UX.</p></div>
        <button className="icon-btn" onClick={onClose}><X size={19}/></button>
      </div>
      <div className="demo-flow">
        <button onClick={()=>{onClose();go("renew")}}><span>01</span><div><b>Renew a driving licence</b><small>Requirements → documents → payment → submission</small></div><ArrowRight/></button>
        <button onClick={()=>{onClose();go("status")}}><span>02</span><div><b>Track an application</b><small>Visual timeline → current owner → next step</small></div><ArrowRight/></button>
        <button onClick={()=>{onClose();go("challan")}}><span>03</span><div><b>Pay a challan</b><small>Lookup → details → payment → receipt</small></div><ArrowRight/></button>
      </div>
      <div className="demo-foot"><ShieldCheck size={16}/><span>All identities, payments, RTOs and transactions shown here are mock data.</span></div>
    </div>
  </div>
}

function App(){
  const [page,setPage]=useState("home");
  const [menu,setMenu]=useState(false);
  const [demo,setDemo]=useState(false);
  const [notifications,setNotifications]=useState(false);
  const go=(p)=>{
    setMenu(false);
    if(p==="dashboard") setPage("dashboard");
    else if(p==="renew") setPage("renew");
    else if(p==="application") setPage("application");
    else if(p==="status") setPage("status");
    else if(p==="rto") setPage("rto");
    else if(p==="help") setPage("help");
    else if(p==="challan") setPage("challan");
    else setPage("home");

    if(p==="services"){
      setPage("home");
      setTimeout(()=>document.getElementById("services")?.scrollIntoView({behavior:"smooth",block:"start"}),50);
    } else {
      window.scrollTo({top:0,behavior:"smooth"});
    }
  };
  return <><Header onMenu={()=>setMenu(!menu)} onHome={go} onDashboard={()=>go("dashboard")} onDemo={()=>setDemo(true)} onNotifications={()=>setNotifications(true)}/>{menu&&<div className="mobile-nav"><button onClick={()=>go("home")}>Services</button><button onClick={()=>go("dashboard")}>My Parivahan</button><button onClick={()=>go("rto")}>Find an RTO</button><button onClick={()=>go("help")}>Help</button></div>}
    {page==="home"&&<HomePage go={go}/>}
    {page==="renew"&&<Requirements go={go}/>}
    {page==="application"&&<Application go={go}/>}
    {page==="status"&&<StatusPage go={go}/>}
    {page==="dashboard"&&<Dashboard go={go}/>}
    {page==="rto"&&<RTOPage/>}
    {page==="help"&&<HelpPage/>}
    {page==="challan"&&<ChallanPage go={go}/>}
    {demo&&<DemoPanel onClose={()=>setDemo(false)} go={go}/>}
    {notifications&&<NotificationsPanel onClose={()=>setNotifications(false)}/>}
    <footer><div><div className="footer-brand-row"><div className="brand"><div className="brand-mark">P</div><div><strong>Parivahan</strong><span>Citizen Services</span></div></div></div><p>One place for vehicle and driving licence services.</p></div><div className="footer-note"><ShieldCheck size={16}/> Prototype with mock data · No real government services connected</div></footer>
  </>
}
createRoot(document.getElementById("root")).render(<App/>);
