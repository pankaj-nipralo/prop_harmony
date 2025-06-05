import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  CalendarDays,
  MoreVertical,
  Star,
  Search,
  AlertTriangle,
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const statusStyles = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-800",
  paid: "bg-green-100 text-green-700",
};

const actionOptions = [
  { label: "Transfer License", value: "transfer" },
  { label: "Pre-closure", value: "preclosure" },
  { label: "Eviction Notice", value: "eviction" },
  { label: "Terminate Agreement", value: "terminate" },
  { label: "Rate Tenant", value: "rate" },
];

const TenantActionModal = ({ open, onClose, tenant, action, onSubmit }) => {
  const [form, setForm] = React.useState({});
  React.useEffect(() => {
    setForm({});
  }, [action, open]);
  if (!tenant || !action) return null;
  let content = null;
  if (action === "transfer") {
    content = (
      <>
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">New Property</label>
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter new property details"
            value={form.property || ""}
            onChange={(e) =>
              setForm((f) => ({ ...f, property: e.target.value }))
            }
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">
            Transfer Date
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="date"
            value={form.date || ""}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">Reason</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            placeholder="Reason for transfer"
            value={form.reason || ""}
            onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
          />
        </div>
      </>
    );
  } else if (action === "preclosure") {
    content = (
      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium">Reason</label>
        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder="Reason for preclosure"
          value={form.reason || ""}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
        />
      </div>
    );
  } else if (action === "eviction") {
    content = (
      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium">Reason</label>
        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder="Reason for eviction"
          value={form.reason || ""}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
        />
      </div>
    );
  } else if (action === "terminate") {
    content = (
      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium">Reason</label>
        <textarea
          className="w-full px-3 py-2 border rounded"
          placeholder="Reason for terminate"
          value={form.reason || ""}
          onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
        />
      </div>
    );
  } else if (action === "rate") {
    content = (
      <>
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">Rating</label>
          <div className="flex gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={22}
                className={`cursor-pointer ${
                  form.rating > i ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={form.rating > i ? "#facc15" : "none"}
                stroke="#facc15"
                onClick={() => setForm((f) => ({ ...f, rating: i + 1 }))}
              />
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">Review</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            placeholder="Write your review about this tenant"
            value={form.review || ""}
            onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
          />
        </div>
      </>
    );
  } else {
    content = (
      <div className="text-gray-500">
        This action is not implemented in demo.
      </div>
    );
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-bold">
            Tenant Actions - {tenant.name}
          </div>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="mb-2 text-sm text-gray-500">
          Action: <span className="font-semibold uppercase">{action}</span>
        </div>
        <div className="p-2 mb-4 text-xs text-gray-600 rounded bg-gray-50">
          <div>
            <span className="font-semibold">Tenant:</span> {tenant.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {tenant.email}
          </div>
          <div>
            <span className="font-semibold">Property:</span> {tenant.address}
          </div>
        </div>
        {content}
        <div className="flex justify-between gap-2 mt-6">
          <button
            className="px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={onClose}
          >
            Back
          </button>
          <button className="px-4 py-2 font-semibold text-white bg-[#223a5f] rounded-lg hover:bg-[#1a2e4a]">
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TenantCardMenu = ({ onAction }) => {
  const [open, setOpen] = useState(false);
  const menuRef = React.useRef();

  // Close menu on outside click
  React.useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1 rounded cursor-pointer hover:bg-gray-100"
        type="button"
      >
        <MoreVertical size={18} className="text-gray-500 cursor-pointer" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 w-56 p-2 mt-2 bg-white shadow-2xl rounded-xl animate-fade-in">
          <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-left text-orange-600 rounded">
            <AlertTriangle className="inline w-4 h-4 mr-2 text-orange-500" />
            Issue Warning
          </button>
          {actionOptions.map((opt) => (
            <button
              key={opt.value}
              className="w-full px-3 py-2 text-sm font-medium text-left text-gray-700 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                onAction(opt.value);
              }}
              type="button"
            >
              {opt.icon || null}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TenantBody = ({ tenants }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState({
    open: false,
    tenant: null,
    action: null,
  });

  if (!tenants || !Array.isArray(tenants) || tenants.length === 0) {
    return <div className="text-gray-500">No tenants found.</div>;
  }

  // Flatten all tenants
  const allTenants = tenants.flatMap((group) => group.tenantsList);

  // Filter tenants by status
  const filteredTenants = allTenants.filter((t) => {
    if (filter === "active") return t.status === "active";
    if (filter === "notice") return t.noticePeriod > 0;
    return true;
  });

  // Search tenants
  const displayedTenants = filteredTenants.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      (t.address && t.address.toLowerCase().includes(q))
    );
  });

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-4 p-4 mb-4 bg-white md:flex-row md:items-center md:justify-between rounded-xl ">
        <div className="flex items-center flex-1 gap-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search tenants by name, email, or property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-md border transition ${
              filter === "all"
                ? "bg-[#223a5f] text-white border-[#223a5f]"
                : "bg-white text-[#223a5f] border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-md border transition ${
              filter === "active"
                ? "bg-[#223a5f] text-white border-[#223a5f]"
                : "bg-white text-[#223a5f] border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-md border transition ${
              filter === "notice"
                ? "bg-[#223a5f] text-white border-[#223a5f]"
                : "bg-white text-[#223a5f] border-gray-200 hover:bg-gray-100"
            }`}
            onClick={() => setFilter("notice")}
          >
            Notice Period
          </button>
        </div>
      </div>
      <div className="grid w-full gap-3 gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {displayedTenants.length === 0 ? (
          <div className="text-gray-500">No tenants found.</div>
        ) : (
          displayedTenants.map((t) => (
            <div
              key={t.id}
              className="w-full max-w-sm p-4 bg-white shadow-sm rounded-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {t.name}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusStyles[t.status]
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <TenantCardMenu
                  onAction={(action) =>
                    setModal({ open: true, tenant: t, action })
                  }
                />
              </div>

              <div className="flex items-center gap-1 mt-2 text-yellow-400">
                {Array.from({ length: Math.floor(t.rating) }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
                <span className="text-sm text-gray-500">({t.rating})</span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-500" />
                  {t.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-500" />
                  {t.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  {t.address}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-gray-500" />
                  Joined: {t.joinedDate}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-4 text-sm border-t">
                <span className="font-semibold text-gray-900">{t.rent}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    statusStyles[t.rentStatus]
                  }`}
                >
                  {t.rentStatus}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <TenantActionModal
        open={modal.open}
        onClose={() => setModal({ open: false, tenant: null, action: null })}
        tenant={modal.tenant}
        action={modal.action}
      />
    </div>
  );
};

export default TenantBody;
