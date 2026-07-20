import { useState, useMemo, useEffect, useRef } from "react";

const C = {
  bg:"#060e0a", panel:"#0a1a14", card:"#0d2018", border:"#00c89620",
  green:"#00c896", blue:"#60a5fa", amber:"#f5a623", red:"#f55a5a",
  purple:"#a78bfa", text:"#dff0e8", muted:"#6a8e80", dim:"#3d5e50"
};

const INIT_MEMBERS = [
  {id:1,name:"Uwimana Alice",email:"alice@ikimina.rw",phone:"0788001001",role:"admin",joined:"2024-01-05",active:true,nationalId:"1199880012345678",gender:"Female",dob:"1988-03-15",residence:"Kigali, Gasabo",occupation:"Teacher",nextOfKin:"Uwimana Paul / 0788009999"},
  {id:2,name:"Habimana Jean",email:"jean@ikimina.rw",phone:"0788001002",role:"member",joined:"2024-01-05",active:true,nationalId:"1199560023456789",gender:"Male",dob:"1990-07-22",residence:"Kigali, Nyarugenge",occupation:"Trader",nextOfKin:"Habimana Rose / 0788008888"},
  {id:3,name:"Mukamana Grace",email:"grace@ikimina.rw",phone:"0788001003",role:"member",joined:"2024-01-05",active:true,nationalId:"1199720034567890",gender:"Female",dob:"1992-11-05",residence:"Kigali, Kicukiro",occupation:"Nurse",nextOfKin:"Mukamana Jules / 0788007777"},
  {id:4,name:"Niyonzima Eric",email:"eric@ikimina.rw",phone:"0788001004",role:"member",joined:"2024-01-05",active:true,nationalId:"1199850045678901",gender:"Male",dob:"1985-04-30",residence:"Musanze",occupation:"Driver",nextOfKin:"Niyonzima Claire / 0788006666"},
  {id:5,name:"Ingabire Diane",email:"diane@ikimina.rw",phone:"0788001005",role:"member",joined:"2024-01-05",active:true,nationalId:"1199930056789012",gender:"Female",dob:"1993-08-18",residence:"Huye",occupation:"Student",nextOfKin:"Ingabire Marie / 0788005555"},
];

const INIT_CONTRIBS = [
  {id:1,memberId:1,amount:5000,date:"2024-01-05",status:"on_time",submittedBy:1,submittedAt:"2024-01-05T08:14:00"},
  {id:2,memberId:1,amount:5000,date:"2024-01-12",status:"on_time",submittedBy:1,submittedAt:"2024-01-12T09:02:00"},
  {id:3,memberId:1,amount:5000,date:"2024-01-19",status:"late",submittedBy:1,submittedAt:"2024-01-19T14:55:00"},
  {id:4,memberId:1,amount:5000,date:"2024-01-26",status:"on_time",submittedBy:1,submittedAt:"2024-01-26T08:30:00"},
  {id:5,memberId:1,amount:5000,date:"2024-02-02",status:"on_time",submittedBy:1,submittedAt:"2024-02-02T07:50:00"},
  {id:6,memberId:2,amount:5000,date:"2024-01-05",status:"on_time",submittedBy:2,submittedAt:"2024-01-05T10:00:00"},
  {id:7,memberId:2,amount:5000,date:"2024-01-12",status:"on_time",submittedBy:2,submittedAt:"2024-01-12T08:45:00"},
  {id:8,memberId:2,amount:5000,date:"2024-01-19",status:"on_time",submittedBy:2,submittedAt:"2024-01-19T09:10:00"},
  {id:9,memberId:2,amount:5000,date:"2024-01-26",status:"missed",submittedBy:1,submittedAt:"2024-01-28T10:00:00"},
  {id:10,memberId:2,amount:5000,date:"2024-02-02",status:"on_time",submittedBy:2,submittedAt:"2024-02-02T08:20:00"},
  {id:11,memberId:3,amount:5000,date:"2024-01-05",status:"on_time",submittedBy:3,submittedAt:"2024-01-05T09:30:00"},
  {id:12,memberId:3,amount:5000,date:"2024-01-12",status:"late",submittedBy:3,submittedAt:"2024-01-12T15:40:00"},
  {id:13,memberId:3,amount:5000,date:"2024-01-19",status:"on_time",submittedBy:3,submittedAt:"2024-01-19T08:00:00"},
  {id:14,memberId:3,amount:5000,date:"2024-01-26",status:"on_time",submittedBy:3,submittedAt:"2024-01-26T09:15:00"},
  {id:15,memberId:3,amount:5000,date:"2024-02-02",status:"on_time",submittedBy:3,submittedAt:"2024-02-02T08:55:00"},
  {id:16,memberId:4,amount:5000,date:"2024-01-05",status:"on_time",submittedBy:4,submittedAt:"2024-01-05T11:00:00"},
  {id:17,memberId:4,amount:5000,date:"2024-01-12",status:"on_time",submittedBy:4,submittedAt:"2024-01-12T10:30:00"},
  {id:18,memberId:4,amount:5000,date:"2024-01-19",status:"missed",submittedBy:1,submittedAt:"2024-01-21T10:00:00"},
  {id:19,memberId:4,amount:5000,date:"2024-01-26",status:"late",submittedBy:4,submittedAt:"2024-01-26T16:20:00"},
  {id:20,memberId:4,amount:5000,date:"2024-02-02",status:"on_time",submittedBy:4,submittedAt:"2024-02-02T09:40:00"},
  {id:21,memberId:5,amount:5000,date:"2024-01-05",status:"on_time",submittedBy:5,submittedAt:"2024-01-05T08:50:00"},
  {id:22,memberId:5,amount:5000,date:"2024-01-12",status:"on_time",submittedBy:5,submittedAt:"2024-01-12T09:20:00"},
  {id:23,memberId:5,amount:5000,date:"2024-01-19",status:"on_time",submittedBy:5,submittedAt:"2024-01-19T10:05:00"},
  {id:24,memberId:5,amount:5000,date:"2024-01-26",status:"on_time",submittedBy:5,submittedAt:"2024-01-26T08:10:00"},
  {id:25,memberId:5,amount:5000,date:"2024-02-02",status:"missed",submittedBy:1,submittedAt:"2024-02-04T10:00:00"},
];
const INIT_PENALTIES = [
  {id:1,memberId:1,type:"late",amount:200,date:"2024-01-19",paid:true},
  {id:2,memberId:2,type:"missed",amount:300,date:"2024-01-26",paid:false},
  {id:3,memberId:3,type:"late",amount:200,date:"2024-01-12",paid:true},
  {id:4,memberId:4,type:"missed",amount:300,date:"2024-01-19",paid:false},
  {id:5,memberId:4,type:"late",amount:200,date:"2024-01-26",paid:true},
  {id:6,memberId:5,type:"missed",amount:300,date:"2024-02-02",paid:false},
];
const INIT_LOANS = [
  {id:1,memberId:2,amount:10000,interest:0.07,status:"approved",security:null,guarantorId:null,guarantorLocked:0,guarantorStatus:null,guarantorApprovedAt:null,guarantorNote:"",issuedDate:"2024-01-15",dueDate:"2024-07-15",repaid:4000,requestDate:"2024-01-14",adminNote:"Within savings limit."},
  {id:2,memberId:4,amount:18000,interest:0.07,status:"awaiting_guarantor",security:"Land title",guarantorId:3,guarantorLocked:3000,guarantorStatus:"pending",guarantorApprovedAt:null,guarantorNote:"",issuedDate:null,dueDate:null,repaid:0,requestDate:"2024-02-01",adminNote:""},
  {id:3,memberId:3,amount:8000,interest:0.07,status:"rejected",security:null,guarantorId:null,guarantorLocked:0,guarantorStatus:null,guarantorApprovedAt:null,guarantorNote:"",issuedDate:null,dueDate:null,repaid:0,requestDate:"2024-01-20",adminNote:"Insufficient pool balance."},
];
const INIT_NOTIFS = [
  {id:1,type:"reminder",title:"Friday contribution due",body:"This Friday, May 9 is your weekly contribution day. Amount: FRW 5,000.",date:"2026-05-07T08:00:00",read:false,global:true},
  {id:2,type:"penalty",title:"Late contribution penalty",body:"Your contribution on 2024-01-19 was submitted late. A penalty of FRW 200 has been applied.",date:"2024-01-19T15:00:00",read:false,forMember:1},
  {id:3,type:"penalty",title:"Missed contribution penalty",body:"No contribution was recorded for 2024-01-26. Penalty of FRW 300 applied.",date:"2024-01-28T10:00:00",read:false,forMember:2},
  {id:4,type:"loan",title:"Loan request received",body:"Your loan request of FRW 18,000 is under review. Waiting for guarantor approval.",date:"2024-02-01T10:00:00",read:true,forMember:4},
  {id:5,type:"loan",title:"Loan approved",body:"Your loan of FRW 10,000 has been approved. Due date: 2024-07-15.",date:"2024-01-15T11:00:00",read:true,forMember:2},
  {id:6,type:"broadcast",title:"Semiannual meeting",body:"Dear members, the semiannual distribution meeting is scheduled for June 30, 2026 at 10:00 AM. Attendance is mandatory.",date:"2026-05-01T09:00:00",read:false,global:true},
  {id:7,type:"reminder",title:"Loan repayment reminder",body:"You have an outstanding loan of FRW 6,700 due on 2024-07-15. Please plan your repayment.",date:"2024-06-01T08:00:00",read:false,forMember:2},
  {id:8,type:"guarantor",title:"🤝 Guarantor request from Niyonzima Eric",body:"Niyonzima Eric listed you as guarantor for a FRW 18,000 loan. FRW 3,000 of your savings will be locked as collateral. If Eric fails to repay, the locked amount will be used to cover the loan. Please review and respond.",date:"2024-02-01T10:05:00",read:false,forMember:3,loanId:2},
];

const fmt = n => `FRW ${Math.round(Number(n)).toLocaleString()}`;
const todayStr = () => new Date().toISOString().split("T")[0];
const nowStr = () => new Date().toISOString();
const pct = (a,b) => b>0?(a/b*100).toFixed(1)+"%":"0%";
const CONTRIB_DEADLINE_HOUR = 12;

const mSavings = (mid,cs) => cs.filter(c=>c.memberId===mid&&c.status!=="missed").reduce((s,c)=>s+c.amount,0);
const mPenTotal = (mid,ps) => ps.filter(p=>p.memberId===mid).reduce((s,p)=>s+p.amount,0);
const mActiveLoan = (mid,ls) => ls.filter(l=>l.memberId===mid&&l.status==="approved").reduce((s,l)=>s+(l.amount-l.repaid),0);
const totalSav = cs => cs.filter(c=>c.status!=="missed").reduce((s,c)=>s+c.amount,0);
const totalLoansOut = ls => ls.filter(l=>l.status==="approved").reduce((s,l)=>s+(l.amount-l.repaid),0);
const totalPen = ps => ps.reduce((s,p)=>s+p.amount,0);
const interestAccrued = ls => ls.filter(l=>l.status==="approved").reduce((s,l)=>s+l.amount*l.interest,0);
const availCash = (cs,ls) => totalSav(cs)-totalLoansOut(ls);
const mLockedSavings = (mid,ls) => ls.filter(l=>l.guarantorId===mid&&(l.status==="approved"||l.status==="pending"||l.status==="awaiting_guarantor")).reduce((s,l)=>s+l.guarantorLocked,0);

const statusColor = {approved:"#00c896",pending:"#f5a623",awaiting_guarantor:"#60a5fa",guarantor_declined:"#f55a5a",rejected:"#f55a5a",on_time:"#00c896",late:"#f5a623",missed:"#f55a5a",admin:"#a78bfa",member:"#60a5fa"};
const notifColor = {reminder:C.blue,penalty:"#f55a5a",loan:"#00c896",broadcast:"#a78bfa",info:"#6a8e80",guarantor:"#f5a623"};
const notifIcon  = {reminder:"🔔",penalty:"⚠️",loan:"🏦",broadcast:"📢",info:"ℹ️",guarantor:"🤝"};

const Badge = ({s}) => { const c=statusColor[s]||"#888"; return <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:5,padding:"1px 8px",fontSize:10,fontWeight:700,letterSpacing:.8,textTransform:"uppercase"}}>{s.replace(/_/g," ")}</span>; };
const SI = ({label,v,c=C.green}) => (
  <div style={{background:C.card,border:`1px solid ${c}25`,borderRadius:12,padding:"14px 18px",flex:1,minWidth:140}}>
    <div style={{color:C.dim,fontSize:9,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>{label}</div>
    <div style={{color:c,fontSize:17,fontWeight:600,fontFamily:"monospace"}}>{v}</div>
  </div>
);
const Inp = ({label,value,onChange,type="text",placeholder,required,half,disabled}) => (
  <div style={{marginBottom:12,width:half?"calc(50% - 6px)":"100%"}}>
    <label style={{display:"block",color:C.muted,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{label}{required&&<span style={{color:C.red}}> *</span>}</label>
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
      style={{display:"block",width:"100%",padding:"9px 12px",background:disabled?"#071510":"#0a1a14",border:"1px solid #00c89628",borderRadius:8,color:disabled?"#3d5e50":C.text,fontSize:12,outline:"none",boxSizing:"border-box"}}
      onFocus={e=>!disabled&&(e.target.style.borderColor="#00c89666")} onBlur={e=>e.target.style.borderColor="#00c89628"}/>
  </div>
);
const Sel = ({label,value,onChange,children,half}) => (
  <div style={{marginBottom:12,width:half?"calc(50% - 6px)":"100%"}}>
    <label style={{display:"block",color:C.muted,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{label}</label>
    <select value={value} onChange={onChange} style={{display:"block",width:"100%",padding:"9px 12px",background:"#0a1a14",border:"1px solid #00c89628",borderRadius:8,color:C.text,fontSize:12,outline:"none",boxSizing:"border-box"}}>{children}</select>
  </div>
);
const Btn = ({onClick,children,c=C.green,outline,full,sm,disabled}) => (
  <button onClick={onClick} disabled={disabled}
    style={{background:outline?c+"18":disabled?"#1a3028":c,border:`1px solid ${disabled?"#1a3028":c+"55"}`,borderRadius:8,padding:sm?"6px 13px":"10px 18px",color:disabled?"#3d5e50":outline?c:"#003d2e",fontWeight:700,fontSize:sm?11:12,width:full?"100%":"auto",cursor:disabled?"not-allowed":"pointer"}}>
    {children}
  </button>
);
const Modal = ({title,children,onClose,wide}) => (
  <div style={{position:"fixed",inset:0,background:"#000c",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:"#0d1f1a",border:"1px solid #00c89633",borderRadius:18,padding:26,width:wide?"620px":"440px",maxWidth:"95vw",maxHeight:"88vh",overflowY:"auto",boxShadow:"0 24px 80px #000d"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <h3 style={{color:C.text,margin:0,fontSize:15,fontWeight:700}}>{title}</h3>
        <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer"}}>×</button>
      </div>
      {children}
    </div>
  </div>
);

/* ── Notifications Panel ── */
function NotifPanel({notifs,user,loans,members,onRead,onReadAll,onClose,onGuarantorDecision}) {
  const mine = notifs.filter(n=>n.global||(n.forMember===user.id)).sort((a,b)=>new Date(b.date)-new Date(a.date));
  const unread = mine.filter(n=>!n.read).length;
  const [gNote,setGNote]=useState({});

  return (
    <div style={{position:"fixed",top:56,right:16,width:390,maxHeight:"78vh",background:"#0d1f1a",border:"1px solid #00c89633",borderRadius:16,zIndex:900,boxShadow:"0 16px 60px #000d",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div>
          <span style={{color:C.text,fontWeight:700,fontSize:14}}>Notifications</span>
          {unread>0&&<span style={{marginLeft:8,background:C.red+"33",color:C.red,borderRadius:99,padding:"1px 8px",fontSize:10,fontWeight:700}}>{unread} new</span>}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {unread>0&&<button onClick={onReadAll} style={{background:"none",border:"none",color:C.muted,fontSize:11,cursor:"pointer",textDecoration:"underline"}}>Mark all read</button>}
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer",lineHeight:1}}>×</button>
        </div>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {mine.length===0&&<div style={{padding:"32px 18px",textAlign:"center",color:C.dim,fontSize:12}}>No notifications yet.</div>}
        {mine.map(n=>{
          const ic=notifIcon[n.type]||"ℹ️";
          const cc=notifColor[n.type]||C.muted;
          const ts=new Date(n.date).toLocaleString("en-RW",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
          const loan = n.type==="guarantor"&&n.loanId ? loans.find(l=>l.id===n.loanId) : null;
          const borrower = loan ? members.find(m=>m.id===loan.memberId) : null;
          const awaitingMe = loan && loan.guarantorStatus==="pending" && loan.guarantorId===user.id;
          const decidedByMe = loan && loan.guarantorId===user.id && (loan.guarantorStatus==="approved"||loan.guarantorStatus==="declined");

          return (
            <div key={n.id} style={{padding:"12px 18px",borderBottom:`1px solid #071510`,background:n.read?"transparent":"#60a5fa08"}}>
              {/* Header row — click to mark read */}
              <div style={{display:"flex",gap:10,alignItems:"flex-start",cursor:"pointer"}} onClick={()=>onRead(n.id)}>
                <span style={{fontSize:16,flexShrink:0,marginTop:1}}>{ic}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                    <span style={{color:n.read?C.muted:C.text,fontWeight:n.read?400:700,fontSize:12}}>{n.title}</span>
                    {!n.read&&<span style={{width:7,height:7,borderRadius:"50%",background:cc,flexShrink:0}}/>}
                  </div>
                  <div style={{color:C.dim,fontSize:11,marginTop:3,lineHeight:1.5}}>{n.body}</div>
                  <div style={{color:"#2a4a3a",fontSize:10,marginTop:4}}>{ts}{n.global&&<span style={{marginLeft:6,color:C.purple,fontSize:9}}>COMMUNITY</span>}</div>
                </div>
              </div>

              {/* ── Guarantor action card ── */}
              {n.type==="guarantor"&&loan&&(
                <div style={{marginTop:10,marginLeft:26}}>
                  {/* Loan summary strip */}
                  <div style={{background:"#060e0a",border:"1px solid #60a5fa22",borderRadius:9,padding:"10px 13px",marginBottom:8}}>
                    <div style={{color:"#3a5a8a",fontSize:9,letterSpacing:1,textTransform:"uppercase",marginBottom:7}}>GUARANTEE DETAILS</div>
                    <div style={{display:"flex",gap:14,flexWrap:"wrap",fontSize:11,marginBottom:8}}>
                      <span style={{color:C.muted}}>Borrower: <span style={{color:C.text,fontWeight:700}}>{borrower?.name}</span></span>
                      <span style={{color:C.muted}}>Loan: <span style={{color:C.green,fontFamily:"monospace",fontWeight:700}}>{fmt(loan.amount)}</span></span>
                      <span style={{color:C.muted}}>Your guarantee: <span style={{color:C.amber,fontFamily:"monospace",fontWeight:700}}>{fmt(loan.guarantorLocked)}</span></span>
                    </div>
                    {/* Risk warning */}
                    <div style={{background:"#f55a5a0d",border:"1px solid #f55a5a28",borderRadius:7,padding:"7px 10px",fontSize:10,color:"#f55a5a",lineHeight:1.6}}>
                      <strong>⚠️ Risk notice:</strong> If {borrower?.name?.split(" ")[0]} defaults on repayment, <strong>{fmt(loan.guarantorLocked)}</strong> will be automatically deducted from your savings to cover the outstanding loan balance. Your savings will only be locked <em>after</em> you approve.
                    </div>
                  </div>

                  {/* Awaiting my decision */}
                  {awaitingMe&&(
                    <>
                      <div style={{marginBottom:7}}>
                        <input value={gNote[n.id]||""} onChange={e=>setGNote(p=>({...p,[n.id]:e.target.value}))}
                          placeholder="Optional note (e.g. 'I agree', conditions, etc.)..."
                          style={{width:"100%",padding:"7px 10px",background:"#0a1a14",border:"1px solid #00c89628",borderRadius:7,color:C.text,fontSize:11,outline:"none",boxSizing:"border-box"}}/>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={()=>{onGuarantorDecision(loan.id,"approved",gNote[n.id]||"");onRead(n.id);}}
                          style={{flex:1,padding:"9px 6px",borderRadius:8,border:"1px solid #00c89655",background:"#00c89618",color:C.green,fontWeight:700,fontSize:11,cursor:"pointer"}}>
                          ✓ Accept Guarantee
                        </button>
                        <button onClick={()=>{onGuarantorDecision(loan.id,"declined",gNote[n.id]||"");onRead(n.id);}}
                          style={{flex:1,padding:"9px 6px",borderRadius:8,border:"1px solid #f55a5a44",background:"#f55a5a0d",color:C.red,fontWeight:700,fontSize:11,cursor:"pointer"}}>
                          ✕ Decline
                        </button>
                      </div>
                      <div style={{color:"#2a4a3a",fontSize:9,marginTop:6,textAlign:"center"}}>Admin cannot approve this loan until you respond.</div>
                    </>
                  )}

                  {/* Already decided */}
                  {decidedByMe&&(
                    <div style={{background:loan.guarantorStatus==="approved"?"#00c89611":"#f55a5a0d",border:`1px solid ${loan.guarantorStatus==="approved"?C.green:C.red}33`,borderRadius:8,padding:"8px 12px",fontSize:11,color:loan.guarantorStatus==="approved"?C.green:C.red,fontWeight:600}}>
                      {loan.guarantorStatus==="approved"?"✓ You accepted this guarantee request.":"✕ You declined this guarantee request."}
                      {loan.guarantorApprovedAt&&<span style={{color:C.dim,fontWeight:400,fontSize:10,display:"block",marginTop:3}}>{new Date(loan.guarantorApprovedAt).toLocaleString("en-RW",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</span>}
                      {loan.guarantorNote&&<span style={{color:C.dim,fontWeight:400,fontSize:10,display:"block"}}>Note: "{loan.guarantorNote}"</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BroadcastModal({onSend,onClose}) {
  const [title,setTitle]=useState("");
  const [body,setBody]=useState("");
  const [type,setType]=useState("broadcast");
  function send(){
    if(!title||!body) return;
    onSend({title,body,type});
    onClose();
  }
  return (
    <Modal title="Send Community Notification" onClose={onClose}>
      <div style={{background:"#071510",border:"1px solid #a78bfa28",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.muted}}>
        This message will be visible to <span style={{color:C.purple}}>all members</span>.
      </div>
      <Sel label="Type" value={type} onChange={e=>setType(e.target.value)}>
        <option value="broadcast">📢 Community Broadcast</option>
        <option value="reminder">🔔 Contribution Reminder</option>
        <option value="info">ℹ️ General Info</option>
      </Sel>
      <Inp label="Title" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Meeting rescheduled" required/>
      <div style={{marginBottom:14}}>
        <label style={{display:"block",color:C.muted,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Message *</label>
        <textarea value={body} onChange={e=>setBody(e.target.value)} rows={4} placeholder="Write your message to all members..."
          style={{display:"block",width:"100%",padding:"9px 12px",background:"#0a1a14",border:"1px solid #00c89628",borderRadius:8,color:C.text,fontSize:12,outline:"none",boxSizing:"border-box",resize:"vertical"}}
          onFocus={e=>e.target.style.borderColor="#00c89666"} onBlur={e=>e.target.style.borderColor="#00c89628"}/>
      </div>
      <Btn onClick={send} c={C.purple} full>Send to All Members</Btn>
    </Modal>
  );
}

/* ── MTN MoMo PIN Popup ── */
function MomoPopup({amount, phone, name, onSuccess, onCancel}) {
  const [pin,setPin]=useState(["","","","",""]);
  const [step,setStep]=useState("prompt"); // prompt | processing | success | failed
  const [dots,setDots]=useState(0);
  const [failMsg,setFailMsg]=useState("");
  const refs=[useRef(),useRef(),useRef(),useRef(),useRef()];

  useEffect(()=>{
    if(step==="processing"){
      const iv=setInterval(()=>setDots(d=>(d+1)%4),500);
      const t=setTimeout(()=>{
        clearInterval(iv);
        setStep("success");
        setTimeout(()=>onSuccess("MTN-"+Math.floor(1000000+Math.random()*9000000)),1500);
      },3000);
      return()=>{clearInterval(iv);clearTimeout(t);};
    }
  },[step]);

  function handlePinKey(i,e){
    const v=e.target.value.replace(/\D/g,"").slice(-1);
    const np=[...pin];np[i]=v;setPin(np);
    if(v&&i<4) refs[i+1].current?.focus();
    if(!v&&e.nativeEvent.inputType==="deleteContentBackward"&&i>0) refs[i-1].current?.focus();
  }
  function handleKeyDown(i,e){
    if(e.key==="Backspace"&&!pin[i]&&i>0){refs[i-1].current?.focus();}
  }
  function submitPin(){
    const full=pin.join("");
    if(full.length<5){return;}
    // simulate wrong pin if "00000"
    if(full==="00000"){setFailMsg("Incorrect PIN. Please try again.");setPin(["","","","",""]);refs[0].current?.focus();return;}
    setStep("processing");
  }

  const boxBase={width:44,height:52,borderRadius:10,border:"2px solid #ffcd00",background:"#1a1200",color:"#ffcd00",fontSize:22,fontWeight:800,textAlign:"center",outline:"none",fontFamily:"monospace"};

  return(
    <div style={{position:"fixed",inset:0,background:"#000000dd",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",borderRadius:22,width:340,maxWidth:"95vw",overflow:"hidden",boxShadow:"0 32px 80px #000d",fontFamily:"'Segoe UI',sans-serif"}}>

        {/* MTN Header */}
        <div style={{background:"#ffcd00",padding:"18px 22px",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:"#1a1200",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📱</div>
          <div>
            <div style={{fontWeight:800,fontSize:15,color:"#1a1200",letterSpacing:.5}}>MTN Mobile Money</div>
            <div style={{fontSize:11,color:"#5a4800",fontWeight:600}}>Secure Payment Request</div>
          </div>
          <div style={{marginLeft:"auto",background:"#1a1200",borderRadius:99,padding:"3px 10px"}}>
            <span style={{color:"#ffcd00",fontSize:10,fontWeight:700,letterSpacing:1}}>MOMO</span>
          </div>
        </div>

        <div style={{padding:"20px 22px"}}>
          {step==="prompt"&&<>
            {/* Payment summary */}
            <div style={{background:"#f9f6e8",border:"1px solid #ffcd0044",borderRadius:12,padding:"14px 16px",marginBottom:18}}>
              <div style={{fontSize:10,color:"#888",letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Payment Details</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{color:"#444",fontSize:12}}>To</span>
                <span style={{fontWeight:700,color:"#1a1200",fontSize:12}}>Ikimina Savings Account</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{color:"#444",fontSize:12}}>From</span>
                <span style={{fontWeight:600,color:"#444",fontSize:12}}>{name} ({phone})</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px dashed #ffcd0066",paddingTop:10,marginTop:4}}>
                <span style={{color:"#444",fontSize:12}}>Amount</span>
                <span style={{fontWeight:800,color:"#1a1200",fontSize:18,fontFamily:"monospace"}}>{fmt(amount)}</span>
              </div>
            </div>

            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{color:"#333",fontSize:13,fontWeight:700,marginBottom:4}}>Enter your MoMo PIN</div>
              <div style={{color:"#888",fontSize:11}}>5-digit PIN to authorise this payment</div>
            </div>

            {/* PIN boxes */}
            <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:16}}>
              {pin.map((v,i)=>(
                <input key={i} ref={refs[i]} type="password" inputMode="numeric" maxLength={1} value={v}
                  onChange={e=>handlePinKey(i,e)} onKeyDown={e=>handleKeyDown(i,e)}
                  style={{...boxBase,borderColor:v?"#ffcd00":"#ddd",background:v?"#1a1200":"#f9f6e8",color:v?"#ffcd00":"#333"}}/>
              ))}
            </div>

            {failMsg&&<div style={{background:"#fff0f0",border:"1px solid #f55a5a44",borderRadius:8,padding:"8px 12px",color:"#d03030",fontSize:12,textAlign:"center",marginBottom:12}}>⚠️ {failMsg}</div>}

            <div style={{fontSize:10,color:"#aaa",textAlign:"center",marginBottom:16}}>Use <strong>00000</strong> to simulate wrong PIN · Any other PIN to approve</div>

            <div style={{display:"flex",gap:10}}>
              <button onClick={onCancel} style={{flex:1,padding:"11px",borderRadius:10,border:"1px solid #ddd",background:"#f5f5f5",color:"#666",fontWeight:700,fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={submitPin} disabled={pin.join("").length<5}
                style={{flex:2,padding:"11px",borderRadius:10,border:"none",background:pin.join("").length<5?"#ffe066":"#ffcd00",color:"#1a1200",fontWeight:800,fontSize:13,cursor:pin.join("").length<5?"not-allowed":"pointer"}}>
                Confirm Payment
              </button>
            </div>
          </>}

          {step==="processing"&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:36,marginBottom:12}}>⏳</div>
              <div style={{fontWeight:700,color:"#1a1200",fontSize:14,marginBottom:6}}>Processing payment{".".repeat(dots)}</div>
              <div style={{color:"#888",fontSize:12}}>Please wait, contacting MTN servers...</div>
              <div style={{marginTop:18,background:"#f9f6e8",borderRadius:99,height:6,overflow:"hidden"}}>
                <div style={{height:"100%",background:"#ffcd00",borderRadius:99,animation:"mtn-prog 3s linear forwards"}}/>
              </div>
              <style>{`@keyframes mtn-prog{from{width:0%}to{width:100%}}`}</style>
            </div>
          )}

          {step==="success"&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{width:56,height:56,borderRadius:"50%",background:"#e8fff4",border:"2px solid #00c896",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>✅</div>
              <div style={{fontWeight:800,color:"#007a50",fontSize:15,marginBottom:4}}>Payment Successful!</div>
              <div style={{color:"#555",fontSize:12}}>{fmt(amount)} sent to Ikimina Savings</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelfContribModal({user,contribs,onRecord,onClose}) {
  const MIN_AMOUNT = 1000;
  const now = new Date();
  const submittedAt = nowStr();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  let autoStatus = "late";
  if (dayOfWeek === 5 && hour < CONTRIB_DEADLINE_HOUR) autoStatus = "on_time";

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay() + (now.getDay()>=5?5:5-7));
  const alreadyThisWeek = contribs.find(c=>c.memberId===user.id && new Date(c.date)>=weekStart);

  const [amount,setAmount]=useState("");
  const [amountErr,setAmountErr]=useState("");
  const [step,setStep]=useState("form"); // form | momo
  const [txRef,setTxRef]=useState("");

  const statusC = autoStatus==="on_time"?C.green:C.amber;
  const statusLabel = autoStatus==="on_time"
    ? "✅ On time — submitted before 12:00 Friday"
    : `⚠️ Late — submitted ${dayOfWeek===5?"after 12:00":"on "+["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dayOfWeek]+", not Friday"}`;

  function proceed(){
    const amt=parseInt(amount);
    if(!amt||amt<MIN_AMOUNT){setAmountErr(`Minimum contribution is ${fmt(MIN_AMOUNT)}.`);return;}
    setAmountErr("");
    setStep("momo");
  }

  function onMomoSuccess(ref){
    setTxRef(ref);
    onRecord({
      amount:parseInt(amount),
      date:todayStr(),
      status:autoStatus,
      submittedBy:user.id,
      submittedAt,
      proofNote:"MTN MoMo TxID: "+ref,
    });
  }

  if(alreadyThisWeek) return (
    <Modal title="Record My Contribution" onClose={onClose}>
      <div style={{background:"#00c89611",border:"1px solid #00c89633",borderRadius:10,padding:"16px 18px",textAlign:"center"}}>
        <div style={{fontSize:28,marginBottom:8}}>✅</div>
        <div style={{color:C.green,fontWeight:700,fontSize:14}}>Already submitted this week</div>
        <div style={{color:C.muted,fontSize:12,marginTop:6}}>Your contribution of {fmt(alreadyThisWeek.amount)} was recorded on {alreadyThisWeek.date}.</div>
        <div style={{marginTop:8}}><Badge s={alreadyThisWeek.status}/></div>
      </div>
    </Modal>
  );

  return (
    <>
      <Modal title="Record My Contribution" onClose={onClose}>
        {/* Member + date info */}
        <div style={{background:"#071510",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",marginBottom:14}}>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            <div><div style={{color:C.dim,fontSize:9,letterSpacing:1}}>MEMBER</div><div style={{color:C.text,fontSize:13,fontWeight:600}}>{user.name}</div></div>
            <div><div style={{color:C.dim,fontSize:9,letterSpacing:1}}>PHONE</div><div style={{color:C.muted,fontSize:12}}>{user.phone}</div></div>
            <div><div style={{color:C.dim,fontSize:9,letterSpacing:1}}>DATE</div><div style={{color:C.text,fontSize:13,fontFamily:"monospace"}}>{todayStr()}</div></div>
            <div><div style={{color:C.dim,fontSize:9,letterSpacing:1}}>TIME</div><div style={{color:C.text,fontSize:13,fontFamily:"monospace"}}>{now.toTimeString().slice(0,5)}</div></div>
          </div>
        </div>

        {/* Amount input */}
        <div style={{marginBottom:14}}>
          <label style={{display:"block",color:C.muted,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Contribution Amount (FRW) <span style={{color:C.red}}>*</span></label>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:C.muted,fontSize:11,fontWeight:700,pointerEvents:"none"}}>FRW</span>
            <input type="number" value={amount} onChange={e=>{setAmount(e.target.value);setAmountErr("");}} placeholder="e.g. 5000"
              style={{display:"block",width:"100%",padding:"11px 12px 11px 46px",background:"#0a1a14",border:`1px solid ${amountErr?"#f55a5a44":"#00c89628"}`,borderRadius:8,color:C.text,fontSize:15,fontWeight:700,outline:"none",boxSizing:"border-box",fontFamily:"monospace"}}
              onFocus={e=>e.target.style.borderColor="#00c89666"} onBlur={e=>e.target.style.borderColor=amountErr?"#f55a5a44":"#00c89628"}/>
          </div>
          {amountErr&&<div style={{color:C.red,fontSize:11,marginTop:5}}>{amountErr}</div>}
          <div style={{color:C.dim,fontSize:10,marginTop:5}}>Minimum: {fmt(MIN_AMOUNT)} · You can contribute any amount above the minimum</div>
          {/* Quick-pick amounts */}
          <div style={{display:"flex",gap:7,marginTop:9,flexWrap:"wrap"}}>
            {[5000,10000,20000,50000].map(a=>(
              <button key={a} onClick={()=>{setAmount(a);setAmountErr("");}}
                style={{background:parseInt(amount)===a?"#00c89622":"#071510",border:`1px solid ${parseInt(amount)===a?C.green+"55":"#1a3028"}`,borderRadius:7,padding:"5px 11px",color:parseInt(amount)===a?C.green:C.dim,fontSize:11,fontWeight:600,cursor:"pointer"}}>
                {fmt(a)}
              </button>
            ))}
          </div>
        </div>

        {/* Timing status */}
        <div style={{background:statusC+"11",border:`1px solid ${statusC}33`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:12,color:statusC}}>
          {statusLabel}
          <div style={{color:C.dim,fontSize:10,marginTop:3}}>Status is auto-determined by system timestamp.</div>
        </div>
        {autoStatus==="late"&&(
          <div style={{background:"#f5a62311",border:"1px solid #f5a62333",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.amber}}>
            ⚠️ A <strong>FRW 200 late penalty</strong> will automatically be applied.
          </div>
        )}

        {/* MoMo info banner */}
        <div style={{background:"#1a120022",border:"1px solid #ffcd0033",borderRadius:9,padding:"10px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:20}}>📱</span>
          <div>
            <div style={{color:"#ffcd00",fontWeight:700,fontSize:12}}>MTN Mobile Money Payment</div>
            <div style={{color:"#887700",fontSize:10,marginTop:2}}>You'll be prompted to enter your MoMo PIN to complete payment.</div>
          </div>
        </div>

        <Btn onClick={proceed} c={C.green} full>Continue to MoMo Payment →</Btn>
      </Modal>

      {step==="momo"&&(
        <MomoPopup
          amount={parseInt(amount)||0}
          phone={user.phone}
          name={user.name.split(" ")[0]}
          onSuccess={onMomoSuccess}
          onCancel={()=>setStep("form")}
        />
      )}
    </>
  );
}

function LoanReview({loan,members,allLoans,contribs,onApprove,onReject}){
  const [note,setNote]=useState(""); const [rNote,setRNote]=useState(""); const [tab,setTab]=useState("approve");
  const cash=availCash(contribs,allLoans);
  const otherPending=allLoans.filter(l=>l.status==="pending"&&l.id!==loan.id);
  const bs=mSavings(loan.memberId,contribs);
  const guarantor=loan.guarantorId?members.find(m=>m.id===loan.guarantorId):null;
  const gs=guarantor?mSavings(guarantor.id,contribs):0;
  const excess=Math.max(0,loan.amount-bs);
  // Savings locked at consent time — use loan.guarantorLocked which is set after consent
  const lockedForThis=loan.guarantorLocked||0;
  const guarantorApproved=!loan.guarantorId||(loan.guarantorStatus==="approved");
  const riskC=loan.amount>cash?C.red:excess>0&&!guarantor&&!loan.security?C.red:excess>0?C.amber:C.green;
  const riskL=loan.amount>cash?"HIGH RISK":excess>0&&!guarantor&&!loan.security?"HIGH RISK":excess>0?"MODERATE":"LOW RISK";
  const canApprove=loan.amount<=cash && guarantorApproved;
  return(
    <div>
      {/* Guarantor consent status banner */}
      {guarantor&&(
        <div style={{background:guarantorApproved?"#00c89611":"#60a5fa0d",border:`1px solid ${guarantorApproved?C.green:C.blue}33`,borderRadius:10,padding:"12px 15px",marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{color:C.dim,fontSize:9,letterSpacing:1,marginBottom:4}}>GUARANTOR CONSENT STATUS</div>
              <div style={{color:guarantorApproved?C.green:C.blue,fontWeight:700,fontSize:13}}>
                {guarantorApproved?"✓ Guarantor approved":"⏳ Awaiting guarantor response"}
              </div>
              <div style={{color:C.muted,fontSize:11,marginTop:2}}>{guarantor.name}</div>
              {loan.guarantorApprovedAt&&<div style={{color:C.dim,fontSize:9,marginTop:2}}>Responded: {new Date(loan.guarantorApprovedAt).toLocaleString("en-RW",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>}
              {loan.guarantorNote&&<div style={{color:C.dim,fontSize:10,marginTop:2,fontStyle:"italic"}}>"{loan.guarantorNote}"</div>}
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{color:C.dim,fontSize:9,marginBottom:2}}>LOCKED FROM GUARANTOR</div>
              <div style={{color:lockedForThis>0?C.amber:C.dim,fontFamily:"monospace",fontWeight:700,fontSize:13}}>{fmt(lockedForThis)}</div>
              {!guarantorApproved&&<div style={{color:C.blue,fontSize:9,marginTop:4}}>Savings locked after consent ✓</div>}
            </div>
          </div>
          {!guarantorApproved&&(
            <div style={{marginTop:10,background:"#60a5fa11",border:"1px solid #60a5fa28",borderRadius:7,padding:"8px 11px",color:C.blue,fontSize:11}}>
              🔒 <strong>Approval blocked:</strong> You cannot approve this loan until {guarantor.name.split(" ")[0]} accepts the guarantor request. They have been notified.
            </div>
          )}
        </div>
      )}

      {/* Risk assessment */}
      <div style={{background:"#071510",border:`1px solid ${riskC}44`,borderRadius:10,padding:"14px 16px",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{color:C.muted,fontSize:10,letterSpacing:1}}>RISK ASSESSMENT</span>
          <span style={{background:riskC+"22",color:riskC,border:`1px solid ${riskC}44`,borderRadius:5,padding:"2px 9px",fontSize:10,fontWeight:700}}>{riskL}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            ["Requested",fmt(loan.amount),C.text],
            ["Pool available",fmt(cash),loan.amount>cash?C.red:C.green],
            ["Borrower savings",fmt(bs),C.text],
            ["Excess over savings",fmt(excess),excess>0?C.amber:C.green],
            ["Other pending",`${otherPending.length} / ${fmt(otherPending.reduce((s,l)=>s+l.amount,0))}`,otherPending.length>0?C.amber:C.muted],
            ["Interest (7%)",fmt(loan.amount*0.07),C.purple]
          ].map(([l,v,c])=>(
            <div key={l} style={{background:"#0a1a14",borderRadius:7,padding:"7px 10px"}}><div style={{color:C.dim,fontSize:9,marginBottom:2}}>{l}</div><div style={{color:c,fontSize:11,fontWeight:600,fontFamily:"monospace"}}>{v}</div></div>
          ))}
        </div>
        {loan.security&&<div style={{marginTop:8,background:"#00c89610",border:"1px solid #00c89630",borderRadius:7,padding:"7px 11px",color:C.green,fontSize:11}}>🔒 Security: {loan.security}</div>}
        {loan.amount>cash&&<div style={{marginTop:8,background:C.red+"11",border:`1px solid ${C.red}33`,borderRadius:7,padding:"7px 11px",color:C.red,fontSize:11}}>⛔ Loan exceeds available pool cash. Cannot approve.</div>}
      </div>

      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["approve","reject"].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"8px",borderRadius:7,border:`1px solid ${tab===t?(t==="approve"?C.green:C.red)+"55":"#1a3028"}`,background:tab===t?(t==="approve"?C.green:C.red)+"18":"transparent",color:tab===t?(t==="approve"?C.green:C.red):C.muted,fontWeight:700,fontSize:11,cursor:"pointer"}}>
            {t==="approve"?"✓ Approve":"✕ Reject"}
          </button>
        ))}
      </div>
      {tab==="approve"&&(
        <>
          <Inp label="Admin note (optional)" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. Collateral verified, guarantor confirmed"/>
          {!canApprove&&!guarantorApproved&&(
            <div style={{background:"#60a5fa11",border:"1px solid #60a5fa33",borderRadius:8,padding:"9px 12px",marginBottom:12,color:C.blue,fontSize:11}}>
              ⏳ Waiting for guarantor consent before you can approve.
            </div>
          )}
          <Btn onClick={()=>onApprove(loan.id,note)} c={C.green} full disabled={!canApprove}>
            {canApprove?"Confirm Approval":"Blocked — Guarantor Consent Required"}
          </Btn>
        </>
      )}
      {tab==="reject"&&(
        <>
          <Inp label="Reason for rejection" value={rNote} onChange={e=>setRNote(e.target.value)} placeholder="e.g. Insufficient pool balance"/>
          <Btn onClick={()=>onReject(loan.id,rNote)} c={C.red} outline full>Confirm Rejection</Btn>
        </>
      )}
    </div>
  );
}

function Reports({members,contribs,penalties,loans}){
  const [rep,setRep]=useState("summary");
  const ts=totalSav(contribs),tl=totalLoansOut(loans),tp=totalPen(penalties),ia=interestAccrued(loans),ac=availCash(contribs,loans);
  const simDist=()=>{const pool=ia+tp;return members.map(m=>{const ms=mSavings(m.id,contribs);const r=ts>0?ms/ts:0;const share=Math.round(pool*r);return{...m,savings:ms,ratio:(r*100).toFixed(1),share,total:ms+share};});};
  const csvDl=(rows,fn)=>{const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(rows.map(r=>r.join(",")).join("\n"));a.download=fn;a.click();};
  const pdfPrint=(id,title)=>{const el=document.getElementById(id);const w=window.open("","_blank");w.document.write(`<html><head><title>${title}</title><style>body{font-family:sans-serif;font-size:12px;padding:20px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px 10px;text-align:left}th{background:#f0f0f0}</style></head><body><h2>${title}</h2>${el.innerHTML}</body></html>`);w.document.close();w.focus();w.print();w.close();};
  const reps={summary:{label:"Summary",desc:"Financial snapshot"},members:{label:"Members",desc:"Member details"},contributions:{label:"Contributions",desc:"All weekly records"},loans:{label:"Loans",desc:"Loan history"},penalties:{label:"Penalties",desc:"Penalty records"},distribution:{label:"Distribution",desc:"Semiannual simulation"}};
  return(
    <div style={{display:"flex",gap:16,minHeight:500}}>
      <div style={{width:170,flexShrink:0,display:"flex",flexDirection:"column",gap:6}}>
        {Object.entries(reps).map(([k,v])=>(
          <button key={k} onClick={()=>setRep(k)} style={{background:rep===k?"#00c89618":"transparent",border:rep===k?"1px solid #00c89633":"1px solid transparent",borderRadius:8,padding:"10px 12px",color:rep===k?C.green:C.muted,fontSize:12,fontWeight:rep===k?700:400,textAlign:"left",cursor:"pointer"}}>
            {v.label}<div style={{color:C.dim,fontSize:10,fontWeight:400}}>{v.desc}</div>
          </button>
        ))}
      </div>
      <div style={{flex:1,minWidth:0}}>
        {rep==="summary"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Summary Report</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Metric","Value"],["Total Savings",ts],["Loans Out",tl],["Available Cash",ac],["Penalties",tp],["Interest",ia]],"summary.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-sum","Summary Report")}>🖨 PDF</Btn></div></div>
          <div id="r-sum"><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}><SI label="Total savings" v={fmt(ts)} c={C.green}/><SI label="Loans out" v={fmt(tl)} c={C.amber}/><SI label="Available cash" v={fmt(ac)} c={C.blue}/><SI label="Interest accrued" v={fmt(ia)} c={C.purple}/></div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{background:"#071510"}}>{["Member","Savings","Active Loan","Penalties","Pool %"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"10px 14px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{members.map((m,i)=>{const ms=mSavings(m.id,contribs);const ml=mActiveLoan(m.id,loans);const mp=mPenTotal(m.id,penalties);return(<tr key={m.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"9px 14px",color:C.text}}>{m.name}</td><td style={{padding:"9px 14px",color:C.green,fontFamily:"monospace"}}>{fmt(ms)}</td><td style={{padding:"9px 14px",color:ml>0?C.amber:C.muted,fontFamily:"monospace"}}>{fmt(ml)}</td><td style={{padding:"9px 14px",color:mp>0?C.red:C.muted,fontFamily:"monospace"}}>{fmt(mp)}</td><td style={{padding:"9px 14px",color:C.muted}}>{pct(ms,ts)}</td></tr>);})}</tbody></table></div>
        </div>}
        {rep==="contributions"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Contributions Report</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Member","Amount","Date","Status","Submitted By","Submitted At"],...contribs.map(c=>{const m=members.find(x=>x.id===c.memberId);const sb=members.find(x=>x.id===c.submittedBy);return[m?.name,c.amount,c.date,c.status,sb?.name||"Admin",c.submittedAt||""];})], "contributions.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-con","Contributions Report")}>🖨 PDF</Btn></div></div>
          <div id="r-con" style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:560}}><thead><tr style={{background:"#071510"}}>{["Member","Amount","Date","Status","Recorded by","Time"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"9px 12px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{[...contribs].reverse().map((c,i)=>{const m=members.find(x=>x.id===c.memberId);const sb=members.find(x=>x.id===c.submittedBy);const self=c.submittedBy===c.memberId;return(<tr key={c.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"8px 12px",color:C.text}}>{m?.name}</td><td style={{padding:"8px 12px",color:C.green,fontFamily:"monospace"}}>{fmt(c.amount)}</td><td style={{padding:"8px 12px",color:C.muted}}>{c.date}</td><td style={{padding:"8px 12px"}}><Badge s={c.status}/></td><td style={{padding:"8px 12px"}}><span style={{color:self?C.green:C.amber,fontSize:10,fontWeight:600}}>{self?"Self":"Admin"}</span></td><td style={{padding:"8px 12px",color:C.dim,fontSize:10}}>{c.submittedAt?new Date(c.submittedAt).toLocaleTimeString("en-RW",{hour:"2-digit",minute:"2-digit"}):"—"}</td></tr>);})}</tbody></table></div>
        </div>}
        {rep==="members"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Members Report</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Name","Phone","National ID","Gender","DOB","Residence","Occupation","Joined","Status"],...members.map(m=>[m.name,m.phone,m.nationalId,m.gender,m.dob,m.residence,m.occupation,m.joined,m.active?"Active":"Inactive"])],"members.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-mem","Members Report")}>🖨 PDF</Btn></div></div>
          <div id="r-mem" style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:600}}><thead><tr style={{background:"#071510"}}>{["Name","Phone","ID Number","Gender","Residence","Occupation","Joined","Status"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"9px 12px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{members.map((m,i)=><tr key={m.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"8px 12px",color:C.text}}>{m.name}</td><td style={{padding:"8px 12px",color:C.muted}}>{m.phone}</td><td style={{padding:"8px 12px",color:C.muted,fontFamily:"monospace",fontSize:10}}>{m.nationalId}</td><td style={{padding:"8px 12px",color:C.muted}}>{m.gender}</td><td style={{padding:"8px 12px",color:C.muted}}>{m.residence}</td><td style={{padding:"8px 12px",color:C.muted}}>{m.occupation}</td><td style={{padding:"8px 12px",color:C.muted}}>{m.joined}</td><td style={{padding:"8px 12px"}}><Badge s={m.active?"approved":"rejected"}/></td></tr>)}</tbody></table></div>
        </div>}
        {rep==="loans"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Loans Report</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Borrower","Amount","Status","Security","Guarantor","Requested","Repaid","Remaining"],...loans.map(l=>{const m=members.find(x=>x.id===l.memberId);const g=l.guarantorId?members.find(x=>x.id===l.guarantorId):null;return[m?.name,l.amount,l.status,l.security||"",g?.name||"",l.requestDate,l.repaid,l.amount-l.repaid];})],"loans.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-loans","Loans Report")}>🖨 PDF</Btn></div></div>
          <div id="r-loans" style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11,minWidth:620}}><thead><tr style={{background:"#071510"}}>{["Borrower","Amount","Status","Security","Guarantor","Requested","Repaid","Remaining"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"9px 12px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{loans.map((l,i)=>{const m=members.find(x=>x.id===l.memberId);const g=l.guarantorId?members.find(x=>x.id===l.guarantorId):null;const rem=l.amount-l.repaid;return(<tr key={l.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"8px 12px",color:C.text}}>{m?.name}</td><td style={{padding:"8px 12px",color:C.green,fontFamily:"monospace"}}>{fmt(l.amount)}</td><td style={{padding:"8px 12px"}}><Badge s={l.status}/></td><td style={{padding:"8px 12px",color:C.muted}}>{l.security||"—"}</td><td style={{padding:"8px 12px",color:l.guarantorId?C.blue:C.muted}}>{g?.name||"—"}</td><td style={{padding:"8px 12px",color:C.muted}}>{l.requestDate}</td><td style={{padding:"8px 12px",color:C.amber,fontFamily:"monospace"}}>{fmt(l.repaid)}</td><td style={{padding:"8px 12px",color:rem>0?C.red:C.green,fontFamily:"monospace"}}>{fmt(rem)}</td></tr>);})}</tbody></table></div>
        </div>}
        {rep==="penalties"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Penalties Report</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Member","Type","Amount","Date","Paid"],...penalties.map(p=>{const m=members.find(x=>x.id===p.memberId);return[m?.name,p.type,p.amount,p.date,p.paid?"Yes":"No"];})],"penalties.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-pen","Penalties Report")}>🖨 PDF</Btn></div></div>
          <div id="r-pen"><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{background:"#071510"}}>{["Member","Type","Amount","Date","Paid"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"10px 14px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{penalties.map((p,i)=>{const m=members.find(x=>x.id===p.memberId);return(<tr key={p.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"8px 14px",color:C.text}}>{m?.name}</td><td style={{padding:"8px 14px"}}><Badge s={p.type}/></td><td style={{padding:"8px 14px",color:C.red,fontFamily:"monospace"}}>{fmt(p.amount)}</td><td style={{padding:"8px 14px",color:C.muted}}>{p.date}</td><td style={{padding:"8px 14px"}}>{p.paid?"✅":"❌"}</td></tr>);})}</tbody></table></div>
        </div>}
        {rep==="distribution"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><span style={{color:C.text,fontWeight:700}}>Distribution Simulation</span><div style={{display:"flex",gap:8}}><Btn sm c={C.blue} outline onClick={()=>csvDl([["Member","Savings","Ratio %","Bonus","Total Payout"],...simDist().map(r=>[r.name,r.savings,r.ratio,r.share,r.total])],"distribution.csv")}>⬇ CSV</Btn><Btn sm c={C.red} outline onClick={()=>pdfPrint("r-dist","Distribution Report")}>🖨 PDF</Btn></div></div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:14}}><SI label="Pool to split" v={fmt(ia+tp)} c={C.blue}/><SI label="Interest" v={fmt(ia)} c={C.purple}/><SI label="Penalties" v={fmt(tp)} c={C.red}/></div>
          <div id="r-dist"><table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}><thead><tr style={{background:"#071510"}}>{["Member","Savings","Ratio","Bonus","Total Payout"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,padding:"10px 14px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead><tbody>{simDist().map((r,i)=><tr key={r.id} style={{borderBottom:`1px solid #071510`,background:i%2?"#071510aa":"transparent"}}><td style={{padding:"9px 14px",color:C.text}}>{r.name}</td><td style={{padding:"9px 14px",color:C.green,fontFamily:"monospace"}}>{fmt(r.savings)}</td><td style={{padding:"9px 14px",color:C.muted}}>{r.ratio}%</td><td style={{padding:"9px 14px",color:C.purple,fontFamily:"monospace"}}>{fmt(r.share)}</td><td style={{padding:"9px 14px",color:C.green,fontFamily:"monospace",fontWeight:700}}>{fmt(r.total)}</td></tr>)}</tbody></table></div>
        </div>}
      </div>
    </div>
  );
}

function RegisterForm({members,setMembers,setModal,setLoginErr}) {
  const [f,setF]=useState({name:"",email:"",phone:"",nationalId:"",gender:"Female",dob:"",residence:"",occupation:"",nextOfKin:"",password:"",password2:""});
  const [err,setErr]=useState("");
  const up=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  function submit(){
    if(!f.name||!f.email||!f.phone||!f.nationalId||!f.dob||!f.residence||!f.occupation){setErr("Fill all required fields.");return;}
    if(!f.password||f.password.length<4){setErr("Password must be ≥ 4 characters.");return;}
    if(f.password!==f.password2){setErr("Passwords do not match.");return;}
    const nm={...f,id:members.length+1,role:"member",joined:todayStr(),active:false};
    setMembers(prev=>[...prev,nm]);
    setModal(null);setLoginErr("Account created! Awaiting admin activation.");
  }
  return(
    <div>
      <div style={{background:"#071510",border:"1px solid #00c89622",borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.muted}}>🔔 Account will be <span style={{color:C.amber}}>pending admin activation</span> after registration.</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
        <Inp label="Full name" value={f.name} onChange={up("name")} required half/><Inp label="National ID" value={f.nationalId} onChange={up("nationalId")} required half/>
        <Inp label="Email" value={f.email} onChange={up("email")} type="email" required half/><Inp label="Phone" value={f.phone} onChange={up("phone")} required half/>
        <Sel label="Gender" value={f.gender} onChange={up("gender")} half><option>Female</option><option>Male</option><option>Other</option></Sel>
        <Inp label="Date of birth" value={f.dob} onChange={up("dob")} type="date" required half/>
        <Inp label="Place of residence" value={f.residence} onChange={up("residence")} required half/><Inp label="Occupation" value={f.occupation} onChange={up("occupation")} required half/>
        <Inp label="Next of kin (name / phone)" value={f.nextOfKin} onChange={up("nextOfKin")} half/>
        <Inp label="Password" value={f.password} onChange={up("password")} type="password" required half/><Inp label="Confirm password" value={f.password2} onChange={up("password2")} type="password" required half/>
      </div>
      {err&&<div style={{color:C.red,fontSize:11,marginBottom:12,background:C.red+"11",borderRadius:7,padding:"7px 11px"}}>{err}</div>}
      <Btn onClick={submit} c={C.green} full>Register →</Btn>
    </div>
  );
}

export default function App(){
  const [members,setMembers]     = useState(INIT_MEMBERS);
  const [contribs,setContribs]   = useState(INIT_CONTRIBS);
  const [penalties,setPenalties] = useState(INIT_PENALTIES);
  const [loans,setLoans]         = useState(INIT_LOANS);
  const [notifs,setNotifs]       = useState(INIT_NOTIFS);
  const [user,setUser]           = useState(null);
  const [page,setPage]           = useState("dashboard");
  const [modal,setModal]         = useState(null);
  const [loginForm,setLoginForm] = useState({email:"",password:""});
  const [loginErr,setLoginErr]   = useState("");
  const [sideOpen,setSideOpen]   = useState(true);
  const [toast,setToast]         = useState(null);
  const [notifOpen,setNotifOpen] = useState(false);
  const [loanForm,setLoanForm]   = useState({amount:"",security:"",guarantorId:""});
  const [loanErr,setLoanErr]     = useState("");
  const [cForm,setCForm]         = useState({memberId:"",amount:5000,date:todayStr(),status:"on_time"});

  const isAdmin = user?.role==="admin";
  const cash    = availCash(contribs,loans);
  const mySav   = user?mSavings(user.id,contribs):0;
  const myMax   = Math.min(mySav,cash);
  const pending = loans.filter(l=>l.status==="pending");
  const myNotifs = user ? notifs.filter(n=>n.global||(n.forMember===user.id)) : [];
  const unreadCount = myNotifs.filter(n=>!n.read).length;

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3200);};
  function addNotif(n){setNotifs(prev=>[{...n,id:prev.length+1,date:nowStr(),read:false},...prev]);}

  function login(){
    const q=loginForm.email.trim().toLowerCase();
    const m=members.find(x=>x.email.toLowerCase()===q || x.phone===loginForm.email.trim());
    if(!m){setLoginErr("Member not found. Check your email or phone number.");return;}
    if(loginForm.password!=="pass"+m.id){setLoginErr("Incorrect password.");return;}
    if(!m.active&&m.role!=="admin"){setLoginErr("Account pending activation by admin.");return;}
    setUser(m);setLoginErr("");setPage("dashboard");
  }

  function activateMember(id){
    setMembers(prev=>prev.map(m=>m.id===id?{...m,active:true}:m));
    const m=members.find(x=>x.id===id);
    addNotif({type:"info",title:"Account activated",body:`Welcome to Ikimina, ${m?.name?.split(" ")[0]}! Your account is now active.`,forMember:id,global:false});
    showToast("Member activated.");
  }

  function recordSelfContrib({amount,date,status,submittedBy,submittedAt,proofNote}){
    const newC={id:contribs.length+1,memberId:user.id,amount,date,status,submittedBy,submittedAt,proofNote:proofNote||""};
    setContribs(prev=>[...prev,newC]);
    if(status==="late"){
      setPenalties(prev=>[...prev,{id:prev.length+1,memberId:user.id,type:"late",amount:200,date,paid:false}]);
      addNotif({type:"penalty",title:"Late contribution penalty applied",body:`Your contribution on ${date} was recorded late. A penalty of FRW 200 has been applied.`,forMember:user.id,global:false});
    } else {
      addNotif({type:"info",title:"Contribution recorded ✓",body:`Your contribution of FRW ${amount.toLocaleString()} for ${date} has been successfully recorded.`,forMember:user.id,global:false});
    }
    setModal(null);
    showToast(status==="late"?"Contribution recorded — late penalty applied.":"Contribution recorded successfully!");
  }

  function addAdminContrib(){
    if(!cForm.memberId){showToast("Select a member.","error");return;}
    const nc={id:contribs.length+1,memberId:parseInt(cForm.memberId),amount:parseInt(cForm.amount),date:cForm.date,status:cForm.status,submittedBy:1,submittedAt:nowStr()};
    setContribs(prev=>[...prev,nc]);
    if(cForm.status==="late") setPenalties(prev=>[...prev,{id:prev.length+1,memberId:parseInt(cForm.memberId),type:"late",amount:200,date:cForm.date,paid:false}]);
    if(cForm.status==="missed"){
      setPenalties(prev=>[...prev,{id:prev.length+1,memberId:parseInt(cForm.memberId),type:"missed",amount:300,date:cForm.date,paid:false}]);
      addNotif({type:"penalty",title:"Missed contribution recorded",body:`Admin recorded a missed contribution for ${cForm.date}. A penalty of FRW 300 has been applied.`,forMember:parseInt(cForm.memberId),global:false});
    }
    setModal(null);showToast("Contribution recorded.");
  }

  function submitLoan(){
    const amt=parseInt(loanForm.amount);
    if(!amt||amt<=0){setLoanErr("Enter a valid amount.");return;}
    if(amt>cash){setLoanErr(`Only ${fmt(cash)} available in pool.`);return;}
    if(loans.find(l=>l.memberId===user.id&&(l.status==="pending"||l.status==="awaiting_guarantor"))){setLoanErr("You already have a pending loan request.");return;}
    const excess=Math.max(0,amt-mySav);
    if(excess>0&&!loanForm.security&&!loanForm.guarantorId){setLoanErr("Loan exceeds your savings — provide security or a guarantor.");return;}
    const hasGuarantor=!!loanForm.guarantorId;
    if(hasGuarantor){
      const gid=parseInt(loanForm.guarantorId);
      const gs=mSavings(gid,contribs);
      // Check against savings only (not pre-locked, since locking only happens after consent)
      if(gs<excess){setLoanErr(`Guarantor's savings of ${fmt(gs)} are insufficient to cover the excess of ${fmt(excess)}.`);return;}
    }
    const newLoanId=loans.length+1;
    const gid=hasGuarantor?parseInt(loanForm.guarantorId):null;
    // guarantorLocked is set to 0 until the guarantor approves — savings NOT locked yet
    setLoans(prev=>[...prev,{
      id:newLoanId, memberId:user.id, amount:amt, interest:0.07,
      status: hasGuarantor ? "awaiting_guarantor" : "pending",
      security:loanForm.security||null,
      guarantorId:gid,
      guarantorLocked: 0,           // ← 0 until guarantor consents
      guarantorStatus: hasGuarantor ? "pending" : null,
      guarantorApprovedAt:null,
      guarantorNote:"",
      issuedDate:null, dueDate:null, repaid:0, requestDate:todayStr(), adminNote:""
    }]);
    // Notify borrower
    addNotif({type:"loan",title:"Loan request submitted",
      body: hasGuarantor
        ? `Your request for ${fmt(amt)} has been sent. Waiting for ${members.find(m=>m.id===gid)?.name?.split(" ")[0]}'s guarantor approval before admin review.`
        : `Your request for ${fmt(amt)} is now under admin review.`,
      forMember:user.id,global:false});
    // Notify guarantor
    if(hasGuarantor){
      const guarantorMember=members.find(m=>m.id===gid);
      addNotif({type:"guarantor",
        title:`🤝 Guarantor request from ${user.name.split(" ")[0]}`,
        body:`${user.name} listed you as guarantor for a ${fmt(amt)} loan. ${fmt(Math.max(0,amt-mySav))} of your savings would be locked as collateral if you accept. If ${user.name.split(" ")[0]} defaults, that amount covers the loan. Please accept or decline.`,
        forMember:gid, global:false, loanId:newLoanId});
    }
    setLoanForm({amount:"",security:"",guarantorId:""});setLoanErr("");setModal(null);
    showToast(hasGuarantor?"Request sent — awaiting guarantor approval.":"Loan request submitted — awaiting admin review.");
  }

  // Called when the guarantor approves or declines
  function handleGuarantorDecision(loanId, decision, note){
    const l=loans.find(x=>x.id===loanId);
    if(!l) return;
    const borrower=members.find(m=>m.id===l.memberId);
    const excess=Math.max(0,l.amount-mSavings(l.memberId,contribs));

    if(decision==="approved"){
      // NOW lock the guarantor's savings and move loan to "pending" for admin review
      setLoans(prev=>prev.map(x=>x.id===loanId?{
        ...x,
        guarantorStatus:"approved",
        guarantorApprovedAt:nowStr(),
        guarantorNote:note,
        guarantorLocked:excess,   // ← savings locked NOW after consent
        status:"pending"          // ← now visible for admin approval
      }:x));
      // Notify borrower
      addNotif({type:"loan",title:"Guarantor approved ✓",
        body:`${user.name.split(" ")[0]} accepted your guarantor request. Your loan of ${fmt(l.amount)} is now under admin review.`,
        forMember:l.memberId,global:false});
      // Notify admin (member 1)
      addNotif({type:"guarantor",title:`🤝 Guarantor approved — ${borrower?.name}'s loan`,
        body:`${user.name} approved the guarantor request for ${borrower?.name}'s ${fmt(l.amount)} loan. ${fmt(excess)} has been locked from ${user.name.split(" ")[0]}'s savings. You can now review and approve the loan.`,
        forMember:1,global:false,loanId:loanId});
      showToast("You accepted the guarantee. Admin has been notified.");
    } else {
      // Declined — loan returns to borrower as rejected-guarantor
      setLoans(prev=>prev.map(x=>x.id===loanId?{
        ...x,
        guarantorStatus:"declined",
        guarantorApprovedAt:nowStr(),
        guarantorNote:note,
        guarantorLocked:0,
        status:"guarantor_declined"
      }:x));
      addNotif({type:"loan",title:"Guarantor declined ⚠️",
        body:`${user.name.split(" ")[0]} declined your guarantor request for the ${fmt(l.amount)} loan. Please choose a different guarantor or provide security and reapply.`,
        forMember:l.memberId,global:false});
      showToast("You declined the guarantee request.");
    }
  }

  function approveLoan(loanId,note){
    const l=loans.find(x=>x.id===loanId);
    const due=new Date();due.setMonth(due.getMonth()+6);
    setLoans(prev=>prev.map(x=>x.id===loanId?{...x,status:"approved",issuedDate:todayStr(),dueDate:due.toISOString().split("T")[0],adminNote:note||"Approved by admin."}:x));
    addNotif({type:"loan",title:"Loan approved ✓",body:`Your loan of ${fmt(l.amount)} has been approved and disbursed. Due by ${due.toISOString().split("T")[0]}. Interest: ${fmt(l.amount*0.07)}.`,forMember:l.memberId,global:false});
    // Also notify guarantor if any
    if(l.guarantorId){
      const g=members.find(m=>m.id===l.guarantorId);
      addNotif({type:"guarantor",title:"Guaranteed loan approved",body:`The loan you guaranteed for ${members.find(m=>m.id===l.memberId)?.name} has been approved. ${fmt(l.guarantorLocked)} of your savings remain locked until full repayment.`,forMember:l.guarantorId,global:false});
    }
    setModal(null);showToast("Loan approved and disbursed.");
  }

  function rejectLoan(loanId,note){
    const l=loans.find(x=>x.id===loanId);
    setLoans(prev=>prev.map(x=>x.id===loanId?{...x,status:"rejected",guarantorLocked:0,adminNote:note||"Rejected by admin."}:x));
    addNotif({type:"loan",title:"Loan request rejected",body:`Your loan request of ${fmt(l.amount)} was not approved. Reason: ${note||"See admin for details."}.`,forMember:l.memberId,global:false});
    // Release guarantor if any
    if(l.guarantorId){
      addNotif({type:"guarantor",title:"Guarantee released",body:`The loan you guaranteed for ${members.find(m=>m.id===l.memberId)?.name} was rejected by admin. Your savings are fully unlocked.`,forMember:l.guarantorId,global:false});
    }
    setModal(null);showToast("Loan rejected.","error");
  }

  function sendBroadcast({title,body,type}){
    addNotif({type,title,body,global:true});
    showToast("Notification sent to all members.");
  }

  function markRead(id){setNotifs(prev=>prev.map(n=>n.id===id?{...n,read:true}:n));}
  function markAllRead(){setNotifs(prev=>prev.map(n=>(n.global||n.forMember===user?.id)?{...n,read:true}:n));}

  if(!user) return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",padding:16}}>
      <div style={{background:"linear-gradient(160deg,#0d2018,#091510)",border:"1px solid #00c89630",borderRadius:22,padding:"40px 36px",width:modal?"620px":"380px",maxWidth:"95vw",boxShadow:"0 40px 100px #00000099",transition:"width .3s"}}>
        {!modal&&<>
          <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:38,marginBottom:4}}>🌿</div><h1 style={{color:C.green,margin:0,fontSize:24,letterSpacing:4,fontWeight:800}}>IKIMINA</h1><p style={{color:C.dim,margin:"5px 0 0",fontSize:10,letterSpacing:2}}>COMMUNITY SAVINGS PLATFORM</p></div>
          <Inp label="Email or Phone number" value={loginForm.email} onChange={e=>setLoginForm(p=>({...p,email:e.target.value}))} placeholder="your@ikimina.rw or 07XXXXXXXX"/>
          <Inp label="Password" value={loginForm.password} onChange={e=>setLoginForm(p=>({...p,password:e.target.value}))} type="password" placeholder="••••••••"/>
          {loginErr&&<div style={{color:loginErr.includes("created")?C.green:C.red,fontSize:11,marginBottom:12,background:(loginErr.includes("created")?C.green:C.red)+"11",borderRadius:7,padding:"7px 11px"}}>{loginErr}</div>}
          <Btn onClick={login} c={C.green} full>Login →</Btn>
          <div style={{textAlign:"center",margin:"14px 0 10px"}}><span style={{color:C.dim,fontSize:11}}>No account? </span><button onClick={()=>setModal("register")} style={{background:"none",border:"none",color:C.green,fontSize:11,fontWeight:700,cursor:"pointer"}}>Register here</button></div>
          <div style={{background:"#071510",borderRadius:9,padding:12}}>
            <p style={{color:C.dim,fontSize:9,marginBottom:6,letterSpacing:1}}>DEMO ACCOUNTS</p>
            {members.slice(0,3).map(m=>(<div key={m.id} style={{marginBottom:5}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:C.muted,fontSize:10}}><span style={{color:C.green}}>{m.email}</span> / pass{m.id}</span>
                {m.role==="admin"&&<Badge s="admin"/>}
              </div>
              <div style={{color:"#2a4a3a",fontSize:9,marginTop:1}}>or phone: <span style={{color:"#4a7a60"}}>{m.phone}</span></div>
            </div>))}
          </div>
        </>}
        {modal==="register"&&<>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}><button onClick={()=>setModal(null)} style={{background:"none",border:"none",color:C.muted,fontSize:18,cursor:"pointer"}}>←</button><h2 style={{color:C.text,margin:0,fontSize:15,fontWeight:700}}>New Member Registration</h2></div>
          <RegisterForm members={members} setMembers={setMembers} setModal={setModal} setLoginErr={setLoginErr}/>
        </>}
      </div>
    </div>
  );

  const navItems=[
    {id:"dashboard",icon:"🏠",label:"Dashboard"},
    {id:"contributions",icon:"💰",label:"Contributions"},
    {id:"loans",icon:"🏦",label:"Loans"},
    {id:"penalties",icon:"⚠️",label:"Penalties"},
    {id:"members",icon:"👥",label:"Members"},
    ...(isAdmin?[{id:"reports",icon:"📋",label:"Reports"},{id:"distribution",icon:"📊",label:"Distribution"}]:[]),
  ];

  return(
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",fontFamily:"'Syne',sans-serif",color:C.text}}>
      {toast&&<div style={{position:"fixed",top:18,right:18,zIndex:2000,background:toast.type==="error"?C.red+"22":C.green+"22",border:`1px solid ${toast.type==="error"?C.red:C.green}55`,borderRadius:10,padding:"10px 16px",color:toast.type==="error"?C.red:C.green,fontSize:12,fontWeight:700,boxShadow:"0 8px 30px #000a"}}>{toast.type==="error"?"❌":"✅"} {toast.msg}</div>}

      <div style={{width:sideOpen?210:58,background:"#0a1a14",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"18px 10px",gap:3,position:"sticky",top:0,height:"100vh",boxSizing:"border-box",transition:"width .22s",overflow:"hidden",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,paddingLeft:4,minWidth:180}}>
          {sideOpen&&<div><div style={{color:C.green,fontWeight:800,letterSpacing:3,fontSize:14}}>IKIMINA</div><div style={{color:C.dim,fontSize:8,letterSpacing:2}}>SAVINGS</div></div>}
          <button onClick={()=>setSideOpen(p=>!p)} style={{background:"#0d2018",border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 7px",color:C.muted,fontSize:13,cursor:"pointer"}}>☰</button>
        </div>
        {navItems.map(n=>(
          <button key={n.id} onClick={()=>setPage(n.id)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",background:page===n.id?"#00c89618":"transparent",border:page===n.id?`1px solid ${C.border}`:"1px solid transparent",color:page===n.id?C.green:C.muted,borderRadius:8,padding:"9px 11px",fontSize:12,fontWeight:page===n.id?700:400,textAlign:"left",whiteSpace:"nowrap",overflow:"hidden",cursor:"pointer"}}>
            <span style={{fontSize:14,flexShrink:0}}>{n.icon}</span>{sideOpen&&n.label}
            {n.id==="loans"&&pending.length>0&&sideOpen&&<span style={{marginLeft:"auto",background:C.amber+"33",color:C.amber,borderRadius:99,padding:"0 6px",fontSize:10,fontWeight:700}}>{pending.length}</span>}
            {n.id==="members"&&isAdmin&&members.filter(m=>!m.active).length>0&&sideOpen&&<span style={{marginLeft:"auto",background:C.red+"33",color:C.red,borderRadius:99,padding:"0 6px",fontSize:10,fontWeight:700}}>{members.filter(m=>!m.active).length}</span>}
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{background:"#071510",border:`1px solid ${C.border}`,borderRadius:9,padding:"9px 11px",minWidth:180}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"#00c89618",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.green,fontWeight:700,fontSize:13,flexShrink:0}}>{user.name[0]}</div>
            {sideOpen&&<div><div style={{color:"#c8e8d8",fontWeight:700,fontSize:11}}>{user.name.split(" ")[0]}</div><Badge s={user.role}/></div>}
          </div>
          {sideOpen&&<button onClick={()=>{setUser(null);setPage("dashboard");}} style={{marginTop:8,width:"100%",background:"transparent",border:`1px solid ${C.border}`,color:C.dim,borderRadius:7,padding:"5px",fontSize:10,cursor:"pointer"}}>Logout</button>}
        </div>
      </div>

      <div style={{flex:1,padding:"0",overflowY:"auto",minWidth:0,display:"flex",flexDirection:"column"}}>
        <div style={{background:"#0a1a14",borderBottom:`1px solid ${C.border}`,padding:"12px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,flexShrink:0}}>
          <div style={{color:C.muted,fontSize:12}}>
            {page.charAt(0).toUpperCase()+page.slice(1)} — <span style={{color:C.dim}}>{new Date().toLocaleDateString("en-RW",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span>
          </div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            <button onClick={()=>setModal({t:"selfContrib"})} style={{background:C.green+"22",border:`1px solid ${C.green}44`,borderRadius:8,padding:"6px 14px",color:C.green,fontSize:11,fontWeight:700,cursor:"pointer"}}>+ My Contribution</button>
            {isAdmin&&<button onClick={()=>setModal({t:"broadcast"})} style={{background:C.purple+"22",border:`1px solid ${C.purple}44`,borderRadius:8,padding:"6px 14px",color:C.purple,fontSize:11,fontWeight:700,cursor:"pointer"}}>📢 Broadcast</button>}
            <button onClick={()=>setNotifOpen(p=>!p)} style={{position:"relative",background:notifOpen?"#00c89622":"transparent",border:`1px solid ${notifOpen?C.green+"44":C.border}`,borderRadius:9,padding:"7px 10px",color:unreadCount>0?C.green:C.muted,fontSize:16,cursor:"pointer"}}>
              🔔
              {unreadCount>0&&<span style={{position:"absolute",top:2,right:2,width:16,height:16,borderRadius:"50%",background:C.red,color:"#fff",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>{unreadCount>9?"9+":unreadCount}</span>}
            </button>
          </div>
        </div>

        {notifOpen&&<NotifPanel notifs={notifs} user={user} loans={loans} members={members} onRead={markRead} onReadAll={markAllRead} onClose={()=>setNotifOpen(false)} onGuarantorDecision={handleGuarantorDecision}/>}

        <div style={{padding:"24px 28px",flex:1}}>
          {page==="dashboard"&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{margin:0,color:C.text,fontSize:18,fontWeight:700}}>Mwaramutse, <span style={{color:C.green}}>{user.name.split(" ")[0]}</span> 👋</h2>
                <p style={{color:C.dim,margin:"3px 0 0",fontSize:11}}>Here's your savings overview for today.</p>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:10}}>
                <SI label="My savings" v={fmt(mySav)} c={C.green}/><SI label="Total pool" v={fmt(totalSav(contribs))} c={C.blue}/>
                <SI label="Loans disbursed" v={fmt(totalLoansOut(loans))} c={C.amber}/><SI label="Available cash" v={fmt(cash)} c={C.purple}/>
              </div>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
                <SI label="My penalties" v={fmt(mPenTotal(user.id,penalties))} c={C.red}/>
                <SI label="My active loan" v={fmt(mActiveLoan(user.id,loans))} c={C.amber}/>
                <SI label="Locked (guarantor)" v={fmt(mLockedSavings(user.id,loans))} c={C.blue}/>
                <SI label="My loan limit" v={fmt(myMax)} c={C.green}/>
              </div>

              {(()=>{
                const now=new Date();const weekStart=new Date(now);weekStart.setDate(now.getDate()-now.getDay()+(now.getDay()>=5?5:5-7));
                const thisWeek=contribs.find(c=>c.memberId===user.id&&new Date(c.date)>=weekStart);
                return(
                  <div style={{background:thisWeek?"#00c89610":"#f5a62310",border:`1px solid ${thisWeek?C.green:C.amber}33`,borderRadius:12,padding:"14px 18px",marginBottom:14,display:"flex",alignItems:"center",gap:14}}>
                    <span style={{fontSize:22}}>{thisWeek?"✅":"⏰"}</span>
                    <div style={{flex:1}}>
                      <div style={{color:thisWeek?C.green:C.amber,fontWeight:700,fontSize:13}}>{thisWeek?"This week's contribution recorded":"This week's contribution pending"}</div>
                      <div style={{color:C.dim,fontSize:11}}>
                        {thisWeek?`${fmt(thisWeek.amount)} submitted on ${thisWeek.date} — `:"Friday is the contribution day. Submit before 12:00 to avoid a late penalty. "}
                        {thisWeek&&<Badge s={thisWeek.status}/>}
                      </div>
                    </div>
                    {!thisWeek&&<Btn onClick={()=>setModal({t:"selfContrib"})} c={C.green} sm>Record Now →</Btn>}
                  </div>
                );
              })()}

              <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{color:C.muted,fontSize:10,letterSpacing:1}}>POOL UTILISATION</span>
                  <span style={{color:C.text,fontSize:11,fontFamily:"monospace"}}>{pct(totalLoansOut(loans),totalSav(contribs))} loaned out</span>
                </div>
                <div style={{background:"#071510",borderRadius:99,height:7,overflow:"hidden"}}><div style={{height:"100%",width:pct(totalLoansOut(loans),totalSav(contribs)),background:C.green,borderRadius:99,transition:"width .6s"}}/></div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}><span style={{color:C.dim,fontSize:10}}>Loaned: {fmt(totalLoansOut(loans))}</span><span style={{color:C.dim,fontSize:10}}>Available: {fmt(cash)}</span></div>
              </div>

              <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",marginBottom:14}}>
                <div style={{color:C.muted,fontSize:9,letterSpacing:2,marginBottom:12}}>MEMBER SAVINGS</div>
                {members.filter(m=>m.active).map(m=>{const ms=mSavings(m.id,contribs);const ts=totalSav(contribs);const locked=mLockedSavings(m.id,loans);return(
                  <div key={m.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:"#00c89615",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.green,fontSize:12,fontWeight:700,flexShrink:0}}>{m.name[0]}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                        <span style={{color:"#c8e8d8",fontSize:11}}>{m.name}</span>
                        <span style={{color:C.green,fontSize:10,fontFamily:"monospace"}}>{fmt(ms)}{locked>0&&<span style={{color:C.amber}}> ({fmt(locked)} 🔒)</span>}</span>
                      </div>
                      <div style={{background:"#071510",borderRadius:99,height:4,overflow:"hidden"}}><div style={{height:"100%",width:pct(ms,ts),background:C.green,borderRadius:99}}/></div>
                    </div>
                  </div>
                );})}
              </div>

              <div style={{display:"flex",gap:9,flexWrap:"wrap"}}>
                <Btn onClick={()=>setModal({t:"selfContrib"})} c={C.green}>+ My Contribution</Btn>
                <Btn onClick={()=>setModal({t:"reqLoan"})} c={C.blue} outline>Request Loan</Btn>
                {isAdmin&&<Btn onClick={()=>setModal({t:"addContrib"})} c={C.amber} outline>Admin Record Missed</Btn>}
                {isAdmin&&<Btn onClick={()=>setPage("loans")} c={C.amber} outline>Review Loans{pending.length>0?` (${pending.length})`:""}</Btn>}
                {isAdmin&&<Btn onClick={()=>setPage("reports")} c={C.purple} outline>📋 Reports</Btn>}
              </div>

              {isAdmin&&members.filter(m=>!m.active).length>0&&(
                <div style={{marginTop:14,background:C.red+"10",border:`1px solid ${C.red}33`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                  <span>🔔</span><div style={{flex:1}}><div style={{color:C.red,fontWeight:700,fontSize:12}}>{members.filter(m=>!m.active).length} member(s) pending activation</div></div>
                  <Btn onClick={()=>setPage("members")} c={C.red} sm>Review →</Btn>
                </div>
              )}
              {isAdmin&&pending.length>0&&(
                <div style={{marginTop:10,background:C.amber+"10",border:`1px solid ${C.amber}33`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                  <span>🔔</span><div style={{flex:1}}>
                    <div style={{color:C.amber,fontWeight:700,fontSize:12}}>{pending.length} loan(s) awaiting your review</div>
                    <div style={{color:C.dim,fontSize:10}}>Total: {fmt(pending.reduce((s,l)=>s+l.amount,0))} — Pool available: {fmt(cash)}</div>
                    {loans.filter(l=>l.status==="awaiting_guarantor").length>0&&<div style={{color:C.blue,fontSize:10,marginTop:2}}>+ {loans.filter(l=>l.status==="awaiting_guarantor").length} waiting for guarantor consent</div>}
                  </div>
                  <Btn onClick={()=>setPage("loans")} c={C.amber} sm>Review →</Btn>
                </div>
              )}
            </div>
          )}

          {page==="contributions"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                <h2 style={{margin:0,color:C.text,fontSize:17,fontWeight:700}}>Contributions</h2>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>setModal({t:"selfContrib"})} c={C.green} sm>+ My Contribution</Btn>
                  {isAdmin&&<Btn onClick={()=>setModal({t:"addContrib"})} c={C.amber} outline sm>Admin: Record Missed</Btn>}
                </div>
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:9,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.muted,display:"flex",gap:20,flexWrap:"wrap"}}>
                <span><span style={{color:C.green,fontWeight:700}}>Self</span> = recorded by the member themselves</span>
                <span><span style={{color:C.amber,fontWeight:700}}>Admin</span> = recorded by admin</span>
              </div>
              <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#071510"}}>{["Member","Amount","Date","Time","Status","Recorded by"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:2,textTransform:"uppercase",padding:"11px 15px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
                  <tbody>{[...contribs].reverse().filter(c=>isAdmin||c.memberId===user.id).map((c,i)=>{
                    const m=members.find(x=>x.id===c.memberId);
                    const self=c.submittedBy===c.memberId;
                    return(<tr key={c.id} style={{borderBottom:`1px solid #071510`,background:i%2?C.card+"aa":"transparent"}}>
                      <td style={{padding:"9px 15px",color:C.text,fontSize:12}}>{m?.name}</td>
                      <td style={{padding:"9px 15px",color:C.green,fontFamily:"monospace",fontSize:12}}>{fmt(c.amount)}</td>
                      <td style={{padding:"9px 15px",color:C.muted,fontSize:11}}>{c.date}</td>
                      <td style={{padding:"9px 15px",color:C.dim,fontSize:10,fontFamily:"monospace"}}>{c.submittedAt?new Date(c.submittedAt).toLocaleTimeString("en-RW",{hour:"2-digit",minute:"2-digit"}):"—"}</td>
                      <td style={{padding:"9px 15px"}}><Badge s={c.status}/></td>
                      <td style={{padding:"9px 15px"}}><span style={{fontSize:10,fontWeight:700,color:self?C.green:C.amber,background:(self?C.green:C.amber)+"18",borderRadius:5,padding:"2px 8px"}}>{self?"Self":"Admin"}</span></td>
                    </tr>);
                  })}</tbody>
                </table>
              </div>
            </div>
          )}

          {page==="loans"&&(
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
                <h2 style={{margin:0,color:C.text,fontSize:17,fontWeight:700}}>
                  Loans
                  {pending.length>0&&<span style={{background:C.amber+"22",color:C.amber,borderRadius:99,padding:"1px 9px",fontSize:11,marginLeft:8}}>{pending.length} pending admin review</span>}
                </h2>
                <Btn onClick={()=>setModal({t:"reqLoan"})} c={C.green}>+ Request Loan</Btn>
              </div>
              {isAdmin&&(
                <div style={{background:C.card,border:`1px solid ${C.blue}28`,borderRadius:12,padding:"14px 18px",marginBottom:18}}>
                  <div style={{color:C.blue,fontSize:10,fontWeight:700,marginBottom:9,letterSpacing:1}}>ADMIN LOAN ANALYSIS</div>
                  <div style={{display:"flex",gap:18,flexWrap:"wrap"}}>
                    {[["Available cash",fmt(cash),C.green],["Awaiting guarantor",loans.filter(l=>l.status==="awaiting_guarantor").length,C.blue],["Pending admin review",pending.length,C.amber],["Total pending",fmt(pending.reduce((s,l)=>s+l.amount,0)),C.amber],["Active loans",fmt(totalLoansOut(loans)),C.blue],["Interest accrued",fmt(interestAccrued(loans)),C.purple]].map(([l,v,c])=>(
                      <div key={l}><div style={{color:C.dim,fontSize:9}}>{l}</div><div style={{color:c,fontWeight:600,fontSize:12,fontFamily:"monospace"}}>{v}</div></div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {loans.filter(l=>isAdmin||l.memberId===user.id||l.guarantorId===user.id).map(loan=>{
                  const m=members.find(x=>x.id===loan.memberId);
                  const g=loan.guarantorId?members.find(x=>x.id===loan.guarantorId):null;
                  const iAmGuarantor=loan.guarantorId===user.id;
                  const bc=loan.status==="pending"?C.amber:loan.status==="approved"?C.green:loan.status==="awaiting_guarantor"?C.blue:C.red;
                  const gStatusColor=loan.guarantorStatus==="approved"?C.green:loan.guarantorStatus==="declined"?C.red:C.blue;
                  return(
                    <div key={loan.id} style={{background:C.panel,border:`1px solid ${bc}28`,borderRadius:12,padding:"16px 20px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                        <div>
                          <div style={{fontWeight:700,color:C.text,fontSize:13}}>{m?.name}
                            {iAmGuarantor&&!isAdmin&&<span style={{marginLeft:8,background:C.blue+"22",color:C.blue,borderRadius:5,padding:"1px 7px",fontSize:9,fontWeight:700}}>YOU ARE GUARANTOR</span>}
                          </div>
                          <div style={{color:C.dim,fontSize:10,marginTop:2}}>Requested {loan.requestDate}</div>
                          {loan.adminNote&&<div style={{color:C.dim,fontSize:10,marginTop:3,fontStyle:"italic"}}>"{loan.adminNote}"</div>}
                        </div>
                        <div style={{textAlign:"right"}}>
                          <Badge s={loan.status}/>
                          <div style={{color:C.green,fontWeight:600,fontSize:16,fontFamily:"monospace",marginTop:5}}>{fmt(loan.amount)}</div>
                          <div style={{color:C.dim,fontSize:10}}>+{fmt(loan.amount*0.07)} interest (7%)</div>
                        </div>
                      </div>

                      {/* Metadata row */}
                      <div style={{display:"flex",gap:12,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
                        {loan.security&&<span style={{color:C.muted,fontSize:10}}>🔒 Security: <span style={{color:C.text}}>{loan.security}</span></span>}
                        {loan.status==="approved"&&<span style={{color:C.muted,fontSize:10}}>Due: <span style={{color:C.amber}}>{loan.dueDate}</span></span>}
                        {loan.status==="approved"&&<span style={{color:C.muted,fontSize:10}}>Remaining: <span style={{color:C.red}}>{fmt(loan.amount-loan.repaid)}</span></span>}
                      </div>

                      {/* Guarantor consent block */}
                      {g&&(
                        <div style={{marginTop:10,background:"#060e0a",border:`1px solid ${gStatusColor}28`,borderRadius:9,padding:"10px 13px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                            <div>
                              <div style={{color:C.dim,fontSize:9,letterSpacing:1,marginBottom:4}}>GUARANTOR</div>
                              <div style={{color:C.blue,fontWeight:700,fontSize:12}}>🤝 {g.name}</div>
                              {loan.guarantorLocked>0
                                ? <div style={{color:C.amber,fontSize:10,marginTop:2}}>🔒 {fmt(loan.guarantorLocked)} locked from savings</div>
                                : <div style={{color:C.dim,fontSize:10,marginTop:2}}>Savings not yet locked (pending consent)</div>
                              }
                            </div>
                            <div style={{textAlign:"right"}}>
                              <span style={{background:gStatusColor+"22",color:gStatusColor,border:`1px solid ${gStatusColor}44`,borderRadius:5,padding:"2px 9px",fontSize:10,fontWeight:700,textTransform:"uppercase"}}>
                                {loan.guarantorStatus==="approved"?"✓ Accepted":loan.guarantorStatus==="declined"?"✕ Declined":"⏳ Awaiting Response"}
                              </span>
                              {loan.guarantorApprovedAt&&<div style={{color:C.dim,fontSize:9,marginTop:4}}>{new Date(loan.guarantorApprovedAt).toLocaleString("en-RW",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</div>}
                              {loan.guarantorNote&&<div style={{color:C.dim,fontSize:9,marginTop:2,fontStyle:"italic"}}>"{loan.guarantorNote}"</div>}
                            </div>
                          </div>
                          {loan.status==="awaiting_guarantor"&&isAdmin&&(
                            <div style={{marginTop:8,background:"#60a5fa0d",border:"1px solid #60a5fa22",borderRadius:7,padding:"6px 10px",color:C.blue,fontSize:10}}>
                              ⏳ Waiting for {g.name.split(" ")[0]} to respond. You can review this loan once they accept.
                            </div>
                          )}
                          {loan.status==="guarantor_declined"&&(
                            <div style={{marginTop:8,background:C.red+"0d",border:`1px solid ${C.red}22`,borderRadius:7,padding:"6px 10px",color:C.red,fontSize:10}}>
                              ✕ Guarantor declined — borrower must reapply with different guarantor or security.
                            </div>
                          )}
                        </div>
                      )}

                      {/* Admin review button — only when status is "pending" AND guarantor has approved (or no guarantor) */}
                      {isAdmin&&loan.status==="pending"&&(
                        <div style={{marginTop:12}}>
                          {loan.guarantorId&&loan.guarantorStatus!=="approved"
                            ? <div style={{background:C.amber+"11",border:`1px solid ${C.amber}33`,borderRadius:7,padding:"7px 11px",color:C.amber,fontSize:11}}>⏳ Cannot review yet — waiting for guarantor consent.</div>
                            : <Btn onClick={()=>setModal({t:"reviewLoan",loan})} c={C.amber} sm>Review & Decide →</Btn>
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {page==="penalties"&&(
            <div>
              <h2 style={{margin:"0 0 18px",color:C.text,fontSize:17,fontWeight:700}}>Penalties</h2>
              <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
                <SI label="Total penalties" v={fmt(totalPen(penalties))} c={C.red}/><SI label="My penalties" v={fmt(mPenTotal(user.id,penalties))} c={C.amber}/><SI label="Unpaid" v={fmt(penalties.filter(p=>!p.paid).reduce((s,p)=>s+p.amount,0))} c={C.red}/>
              </div>
              <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#071510"}}>{["Member","Type","Amount","Date","Paid"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:2,textTransform:"uppercase",padding:"11px 15px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
                  <tbody>{penalties.filter(p=>isAdmin||p.memberId===user.id).map((p,i)=>{const m=members.find(x=>x.id===p.memberId);return(<tr key={p.id} style={{borderBottom:`1px solid #071510`,background:i%2?C.card+"aa":"transparent"}}><td style={{padding:"9px 15px",color:C.text,fontSize:12}}>{m?.name}</td><td style={{padding:"9px 15px"}}><Badge s={p.type}/></td><td style={{padding:"9px 15px",color:C.red,fontFamily:"monospace",fontSize:12}}>{fmt(p.amount)}</td><td style={{padding:"9px 15px",color:C.muted,fontSize:11}}>{p.date}</td><td style={{padding:"9px 15px"}}>{p.paid?"✅":"❌"}</td></tr>);})}</tbody>
                </table>
              </div>
            </div>
          )}

          {page==="members"&&(
            <div>
              <h2 style={{margin:"0 0 18px",color:C.text,fontSize:17,fontWeight:700}}>Members</h2>
              {isAdmin&&members.filter(m=>!m.active).length>0&&(
                <div style={{background:C.red+"10",border:`1px solid ${C.red}33`,borderRadius:10,padding:"12px 16px",marginBottom:16}}>
                  <div style={{color:C.red,fontWeight:700,fontSize:12,marginBottom:10}}>🔔 Pending Activation</div>
                  {members.filter(m=>!m.active).map(m=>(
                    <div key={m.id} style={{display:"flex",alignItems:"center",gap:12,marginBottom:8,background:"#071510",borderRadius:8,padding:"9px 12px"}}>
                      <div style={{flex:1}}><div style={{color:C.text,fontSize:12,fontWeight:600}}>{m.name}</div><div style={{color:C.muted,fontSize:10}}>{m.email} · {m.phone} · ID: {m.nationalId}</div></div>
                      <Btn onClick={()=>activateMember(m.id)} c={C.green} sm>Activate</Btn>
                    </div>
                  ))}
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:9}}>
                {members.filter(m=>m.active).map(m=>{
                  const ms=mSavings(m.id,contribs);const ml=mActiveLoan(m.id,loans);const mp=mPenTotal(m.id,penalties);const locked=mLockedSavings(m.id,loans);
                  return(
                    <div key={m.id} style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
                      <div style={{width:38,height:38,borderRadius:"50%",background:"#00c89615",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.green,fontWeight:700,fontSize:15,flexShrink:0}}>{m.name[0]}</div>
                      <div style={{flex:1,minWidth:130}}>
                        <div style={{fontWeight:700,color:C.text,fontSize:12}}>{m.name}</div>
                        <div style={{color:C.dim,fontSize:10}}>{m.phone} · {m.residence}</div>
                        <div style={{color:C.dim,fontSize:10}}>ID: {m.nationalId} · {m.gender} · {m.occupation}</div>
                        <div style={{marginTop:4}}><Badge s={m.role}/></div>
                      </div>
                      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                        {[["SAVINGS",fmt(ms),C.green],["LOCKED",fmt(locked),C.amber],["ACTIVE LOAN",fmt(ml),C.amber],["PENALTIES",fmt(mp),C.red]].map(([l,v,c])=>(
                          <div key={l}><div style={{color:C.dim,fontSize:8,letterSpacing:1}}>{l}</div><div style={{color:c,fontSize:11,fontFamily:"monospace",fontWeight:600}}>{v}</div></div>
                        ))}
                      </div>
                      <button onClick={()=>setModal({t:"viewMember",m})} style={{background:"#00c89615",border:`1px solid ${C.border}`,borderRadius:7,padding:"5px 11px",color:C.muted,fontSize:10,cursor:"pointer"}}>View profile</button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {page==="reports"&&isAdmin&&<div><h2 style={{margin:"0 0 18px",color:C.text,fontSize:17,fontWeight:700}}>Reports</h2><Reports members={members} contribs={contribs} penalties={penalties} loans={loans}/></div>}

          {page==="distribution"&&isAdmin&&(
            <div>
              <h2 style={{margin:"0 0 6px",color:C.text,fontSize:17,fontWeight:700}}>Semiannual Distribution Simulator</h2>
              <p style={{color:C.dim,fontSize:11,marginBottom:18}}>Simulates payouts if the period ended today.</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:18}}>
                <SI label="Total savings" v={fmt(totalSav(contribs))} c={C.green}/><SI label="Total interest" v={fmt(interestAccrued(loans))} c={C.purple}/><SI label="Total penalties" v={fmt(totalPen(penalties))} c={C.red}/><SI label="Total to distribute" v={fmt(interestAccrued(loans)+totalPen(penalties))} c={C.blue}/>
              </div>
              <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{background:"#071510"}}>{["Member","Savings","Ratio","Bonus share","Total payout"].map(h=><th key={h} style={{color:C.dim,fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"11px 15px",textAlign:"left",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
                  <tbody>{(()=>{const ts=totalSav(contribs);const pool=interestAccrued(loans)+totalPen(penalties);return members.filter(m=>m.active).map((m,i)=>{const ms=mSavings(m.id,contribs);const r=ts>0?ms/ts:0;const share=Math.round(pool*r);return(<tr key={m.id} style={{borderBottom:`1px solid #071510`,background:i%2?C.card+"aa":"transparent"}}><td style={{padding:"10px 15px",color:C.text,fontSize:12}}>{m.name}</td><td style={{padding:"10px 15px",color:C.green,fontFamily:"monospace",fontSize:12}}>{fmt(ms)}</td><td style={{padding:"10px 15px",color:C.muted,fontSize:11}}>{(r*100).toFixed(1)}%</td><td style={{padding:"10px 15px",color:C.purple,fontFamily:"monospace",fontSize:12}}>{fmt(share)}</td><td style={{padding:"10px 15px",color:C.green,fontFamily:"monospace",fontSize:13,fontWeight:700}}>{fmt(ms+share)}</td></tr>);});})()} </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {modal?.t==="selfContrib"&&<SelfContribModal user={user} contribs={contribs} onRecord={recordSelfContrib} onClose={()=>setModal(null)}/>}
      {modal?.t==="broadcast"&&<BroadcastModal onSend={sendBroadcast} onClose={()=>setModal(null)}/>}

      {modal?.t==="reqLoan"&&(
        <Modal title="Request a Loan" onClose={()=>{setModal(null);setLoanErr("");}}>
          <div style={{background:"#071510",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 13px",marginBottom:14,fontSize:11,color:C.muted}}>
            Borrow up to <span style={{color:C.green,fontWeight:700}}>{fmt(mySav)}</span> without collateral · Pool: <span style={{color:C.blue}}>{fmt(cash)}</span>
          </div>
          <Inp label="Loan amount (FRW)" value={loanForm.amount} onChange={e=>setLoanForm(p=>({...p,amount:e.target.value}))} type="number" placeholder="e.g. 10000"/>
          <Inp label="Security asset (if loan > savings)" value={loanForm.security} onChange={e=>setLoanForm(p=>({...p,security:e.target.value}))} placeholder="e.g. Land title, motorcycle"/>
          <Sel label="Guarantor (if loan > savings)" value={loanForm.guarantorId} onChange={e=>setLoanForm(p=>({...p,guarantorId:e.target.value}))}>
            <option value="">— None —</option>
            {members.filter(m=>m.id!==user.id&&m.active).map(m=>{const gs=mSavings(m.id,contribs);const locked=mLockedSavings(m.id,loans);const avail=gs-locked;return <option key={m.id} value={m.id}>{m.name} — {fmt(avail)} available</option>;})}
          </Sel>
          {loanForm.guarantorId&&(()=>{const gid=parseInt(loanForm.guarantorId);const gs=mSavings(gid,contribs);const locked=mLockedSavings(gid,loans);const avail=gs-locked;const excess=Math.max(0,(parseInt(loanForm.amount)||0)-mySav);return <div style={{background:avail>=excess?"#00c89611":"#f55a5a11",border:`1px solid ${avail>=excess?C.green:C.red}33`,borderRadius:7,padding:"8px 11px",fontSize:11,color:avail>=excess?C.green:C.red,marginBottom:12}}>{avail>=excess?`✓ Guarantor can cover excess of ${fmt(excess)}.`:`⛔ Guarantor only has ${fmt(avail)} (need ${fmt(excess)}).`}</div>;})()}
          {loanErr&&<div style={{color:C.red,fontSize:11,marginBottom:12,background:C.red+"11",borderRadius:7,padding:"7px 11px"}}>{loanErr}</div>}
          <Btn onClick={submitLoan} c={C.green} full>Submit Request</Btn>
        </Modal>
      )}

      {modal?.t==="reviewLoan"&&(
        <Modal title={`Review Loan — ${members.find(m=>m.id===modal.loan.memberId)?.name}`} onClose={()=>setModal(null)} wide>
          <LoanReview loan={modal.loan} members={members} allLoans={loans} contribs={contribs} onApprove={approveLoan} onReject={rejectLoan}/>
        </Modal>
      )}

      {modal?.t==="addContrib"&&(
        <Modal title="Admin: Record Missed / Unsubmitted Contribution" onClose={()=>setModal(null)}>
          <div style={{background:"#f5a62311",border:"1px solid #f5a62333",borderRadius:8,padding:"10px 14px",marginBottom:14,fontSize:11,color:C.amber}}>
            ⚠️ Admin-recorded contributions are logged as <strong>"Admin"</strong> in the audit trail.
          </div>
          <Sel label="Member" value={cForm.memberId} onChange={e=>setCForm(p=>({...p,memberId:e.target.value}))}>
            <option value="">— Select member —</option>
            {members.filter(m=>m.active).map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
          </Sel>
          <Inp label="Amount (FRW)" value={cForm.amount} onChange={e=>setCForm(p=>({...p,amount:e.target.value}))} type="number"/>
          <Inp label="Contribution date" value={cForm.date} onChange={e=>setCForm(p=>({...p,date:e.target.value}))} type="date"/>
          <Sel label="Status" value={cForm.status} onChange={e=>setCForm(p=>({...p,status:e.target.value}))}>
            <option value="late">Late (FRW 200 penalty)</option>
            <option value="missed">Missed (FRW 300 penalty)</option>
          </Sel>
          <Btn onClick={addAdminContrib} c={C.amber} full>Record Contribution</Btn>
        </Modal>
      )}

      {modal?.t==="viewMember"&&(
        <Modal title="Member Profile" onClose={()=>setModal(null)}>
          {(()=>{const m=modal.m;const ms=mSavings(m.id,contribs);const ml=mActiveLoan(m.id,loans);const mp=mPenTotal(m.id,penalties);const locked=mLockedSavings(m.id,loans);
          return(<div>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18,paddingBottom:16,borderBottom:`1px solid ${C.border}`}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:"#00c89618",border:`2px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.green,fontWeight:700,fontSize:22}}>{m.name[0]}</div>
              <div><div style={{color:C.text,fontWeight:700,fontSize:15}}>{m.name}</div><Badge s={m.role}/></div>
            </div>
            {[["National ID",m.nationalId],["Gender",m.gender],["Date of birth",m.dob],["Phone",m.phone],["Email",m.email],["Residence",m.residence],["Occupation",m.occupation],["Next of kin",m.nextOfKin],["Joined",m.joined]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid #071510`}}>
                <span style={{color:C.muted,fontSize:11}}>{l}</span><span style={{color:C.text,fontSize:11,fontWeight:600}}>{v||"—"}</span>
              </div>
            ))}
            <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
              <SI label="Savings" v={fmt(ms)} c={C.green}/><SI label="Locked" v={fmt(locked)} c={C.amber}/><SI label="Active loan" v={fmt(ml)} c={C.amber}/><SI label="Penalties" v={fmt(mp)} c={C.red}/>
            </div>
          </div>);})()}
        </Modal>
      )}
    </div>
  );
}
