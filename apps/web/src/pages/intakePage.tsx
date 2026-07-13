'use client';

import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Calendar, 
  UserCheck, 
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// --- Type Defs to match your system core architecture ---
interface CustomerIntakeForm {
  companyId: string;
  csrName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  serviceAddress: string;
  serviceCity: string;
  serviceState: string;
  serviceZip: string;
  sameAsBilling: boolean;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  requestType: 'service' | 'estimate';
  problemDescription: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTechId: string;
}

export default function CsrCustomerIntake() {
  // Hardcoded simulation - In production, pull these live from your system context / session
  const CURRENT_COMPANY = { id: "comp_918231", name: "Apex Air HVAC & Plumbing" };
  const LOGGED_IN_CSR = "Sarah Jenkins";
  const AVAILABLE_TECHNICIANS = [
    { id: "tech_01", name: "Dave Miller (HVAC Senior)" },
    { id: "tech_02", name: "Marcus Brody (Plumbing Pro)" },
    { id: "tech_03", name: "Alex Wong (Apprentice)" },
  ];

  // Initial Form Setup
  const [formData, setFormData] = useState<CustomerIntakeForm>({
    companyId: CURRENT_COMPANY.id,
    csrName: LOGGED_IN_CSR,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceAddress: '',
    serviceCity: '',
    serviceState: '',
    serviceZip: '',
    sameAsBilling: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    requestType: 'service',
    problemDescription: '',
    scheduledDate: '',
    scheduledTime: '',
    assignedTechId: '',
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: ''
  });

  // Track standard input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Sync / Unsync Billing addresses instantly 
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsBilling: checked,
      ...(checked ? {
        billingAddress: prev.serviceAddress,
        billingCity: prev.serviceCity,
        billingState: prev.serviceState,
        billingZip: prev.serviceZip,
      } : {
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
      })
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Enforce data synchronization fallback before network transmission
    const payload = {
      ...formData,
      billingAddress: formData.sameAsBilling ? formData.serviceAddress : formData.billingAddress,
      billingCity: formData.sameAsBilling ? formData.serviceCity : formData.billingCity,
      billingState: formData.sameAsBilling ? formData.serviceState : formData.billingState,
      billingZip: formData.sameAsBilling ? formData.serviceZip : formData.billingZip,
    };

    try {
      // Replace with your actual FSM Core API Client route call
      // const res = await fetch('/api/v1/customers/intake', { method: 'POST', body: JSON.stringify(payload) });
      console.log('Sending JSON Payload to multi-tenant database schema:', payload);
      
      setStatus({ 
        type: 'success', 
        message: `Customer ${payload.firstName} ${payload.lastName} saved successfully to ${CURRENT_COMPANY.name}!` 
      });
      
      // Reset form variables while keeping environment parameters locked
      setFormData({
        companyId: CURRENT_COMPANY.id,
        csrName: LOGGED_IN_CSR,
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        serviceAddress: '',
        serviceCity: '',
        serviceState: '',
        serviceZip: '',
        sameAsBilling: true,
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        requestType: 'service',
        problemDescription: '',
        scheduledDate: '',
        scheduledTime: '',
        assignedTechId: '',
      });
    } catch (err) {
      setStatus({ type: 'error', message: 'Database dispatch error. Configuration parsing check failed.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        
        {/* TOP STATUS BAR: Multi-tenant Metadata Monitoring */}
        <div className="bg-slate-900 text-white px-6 py-3 flex flex-wrap items-center justify-between text-xs tracking-wide">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>TENANT ORG ID: <strong className="text-emerald-400 font-mono">{formData.companyId}</strong> ({CURRENT_COMPANY.name})</span>
          </div>
          <div className="flex items-center space-x-2 mt-1 sm:mt-0">
            <UserCheck className="w-4 h-4 text-sky-400" />
            <span>CSR LOGGER: <strong className="text-sky-400">{formData.csrName}</strong></span>
          </div>
        </div>

        {/* HEADER AREA */}
        <div className="px-8 py-6 border-b border-gray-100 bg-slate-50">
          <h1 className="text-2xl font-bold text-gray-900">New Customer Intake Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Fill out information systematically while handling live customer dispatch routing calls.</p>
        </div>

        {/* FEEDBACK BANNERS */}
        {status.type && (
          <div className={`mx-8 mt-6 p-4 rounded-lg flex items-center space-x-3 text-sm font-medium ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                        <input 
                    required 
                    type="text" 
                    name="serviceAddress" 
                    value={formData.serviceAddress} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                    placeholder="123 Main St" 
                  />
                </div>
                
                {/* Structural Input Grid for City, State, and Zip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">City *</label>
                    <input 
                      required 
                      type="text" 
                      name="serviceCity" 
                      value={formData.serviceCity} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                      placeholder="Austin" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">State *</label>
                    <input 
                      required 
                      type="text" 
                      name="serviceState" 
                      value={formData.serviceState} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                      placeholder="TX" 
                      maxLength={2} 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Zip *</label>
                    <input 
                      required 
                      type="text" 
                      name="serviceZip" 
                      value={formData.serviceZip} 
                      onChange={handleInputChange} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                      placeholder="78701" 
                    />
                  </div>
                </div>
              </div>

              {/* Billing Location Module Layout */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 block">BILLING LOCATION</span>
                  <label className="flex items-center space-x-1 text-xs cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      name="sameAsBilling" 
                      checked={formData.sameAsBilling} 
                      onChange={handleCheckboxChange} 
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5" 
                    />
                    <span className="text-gray-600 font-medium">Same as Service</span>
                  </label>
                </div>

                {/* Balanced Ternary Structure Safe For Strict Mode Compiling */}
                {!formData.sameAsBilling ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Street Address</label>
                      <input 
                        type="text" 
                        name="billingAddress" 
                        value={formData.billingAddress} 
                        onChange={handleInputChange} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                        placeholder="PO Box 456" 
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                        <input 
                          type="text" 
                          name="billingCity" 
                          value={formData.billingCity} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                          placeholder="Austin" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">State</label>
                        <input 
                          type="text" 
                          name="billingState" 
                          value={formData.billingState} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                          placeholder="TX" 
                          maxLength={2} 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Zip</label>
                        <input 
                          type="text" 
                          name="billingZip" 
                          value={formData.billingZip} 
                          onChange={handleInputChange} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                          placeholder="78701" 
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[140px] flex items-center justify-center border border-dashed border-gray-200 rounded-md p-6 bg-slate-100/50">
                    <p className="text-xs text-gray-400 italic">Inheriting configuration parameters from active service site locations.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          <hr className="border-gray-200" />

          {/* SECTION 3: Scheduling Details & Live Dispatch Queue Routing */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center mb-4">
              <Calendar className="w-4 h-4 mr-2 text-indigo-500" /> Intake & Dispatch Triage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Request Type *</label>
                <select 
                  name="requestType" 
                  value={formData.requestType} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                >
                  <option value="service">Standard Service Call</option>
                  <option value="estimate">New System Estimate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Scheduled Date</label>
                <input 
                  type="date" 
                  name="scheduledDate" 
                  value={formData.scheduledDate} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time Slot Window</label>
                <select 
                  name="scheduledTime" 
                  value={formData.scheduledTime} 
                  onChange={handleInputChange} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white"
                >
                  <option value="">-- Choose Window --</option>
                  <option value="8am-12pm">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="12pm-4pm">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="4pm-8pm">Evening (4:00 PM - 8:00 PM)</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">Problem Description / Dispatch Notes *</label>
                <textarea 
                  required 
                  name="problemDescription" 
                  value={formData.problemDescription} 
                  onChange={handleInputChange} 
                  rows={3} 
