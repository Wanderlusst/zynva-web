'use client';

// Image URLs from Figma
const img01DashboardDesktop = "https://www.figma.com/api/mcp/asset/815326f6-8cf9-4404-be51-ab3d22162e68";
const imgImage = "https://www.figma.com/api/mcp/asset/9cbeddca-0d61-4a19-81ab-154e9c193d5b";
const imgImage1 = "https://www.figma.com/api/mcp/asset/93e887d6-244e-4b1a-b330-e6529abe5aa5";
const imgImage2 = "https://www.figma.com/api/mcp/asset/d5ac6d45-5f28-4cad-bf7d-42775f3d8b5d";
const imgImage3 = "https://www.figma.com/api/mcp/asset/387c71a5-1e46-4bfc-a74e-f174b53f59e9";
const imgImage4 = "https://www.figma.com/api/mcp/asset/ff7a0868-dc83-4de4-b021-4d1de33dc43d";
const img04PatientDesktop = "https://www.figma.com/api/mcp/asset/6373dedc-018e-4439-945e-6da3217e5897";
const img05PatientTablet = "https://www.figma.com/api/mcp/asset/d7b46757-7afe-4d6f-ac22-1157d40781e7";
const img06PatientMobile = "https://www.figma.com/api/mcp/asset/6d9f7290-2642-48a5-92a4-f39538f1f105";
const img07PatientDetailsDesktop = "https://www.figma.com/api/mcp/asset/f42a8af3-05cb-4575-8269-273c46ba8127";
const img08PatientDetailsTablet = "https://www.figma.com/api/mcp/asset/31d912fe-7db5-49e1-af0d-9a0330797286";
const imgImage5 = "https://www.figma.com/api/mcp/asset/842a8bb2-b4f4-4a8d-ae8b-488625e18e4d";
const imgImage6 = "https://www.figma.com/api/mcp/asset/24a73303-8913-4ed5-bf07-5f1be8cc1a8b";
const img10DoctorsDesktop = "https://www.figma.com/api/mcp/asset/5d141ce0-01ba-4e76-9784-c37f8584861b";
const img11DoctorsTablet = "https://www.figma.com/api/mcp/asset/44ac488c-5317-4723-850b-9bf174e066a8";
const img12DoctorsMobile = "https://www.figma.com/api/mcp/asset/2b79a06c-12e8-43d2-9f4a-9d8dcc84ac0c";
const img13DoctorDetailsDesktop = "https://www.figma.com/api/mcp/asset/602d3819-100e-496b-8f1f-16918d41c715";
const img14DoctorDetailsTablet = "https://www.figma.com/api/mcp/asset/e63fa6fe-e705-45e8-92b8-2aba46c95c81";
const imgImage7 = "https://www.figma.com/api/mcp/asset/8a3897c0-e1c5-4863-8449-4ce62806c83f";
const imgImage8 = "https://www.figma.com/api/mcp/asset/1dfca8a3-fd08-4846-99d4-3ed7aabaf26a";
const img16AppointmentsDesktop = "https://www.figma.com/api/mcp/asset/66777f84-6491-441f-a878-52f2f0962edd";
const img17AppointmentsTablet = "https://www.figma.com/api/mcp/asset/6178102e-64ba-4300-b1d0-ccab60324931";
const img18AppointmentsMobile = "https://www.figma.com/api/mcp/asset/6d2243e2-d551-4ec8-b33b-6e0b8423e08f";
const img19SurgeryScheduleDesktop = "https://www.figma.com/api/mcp/asset/ab86cb1b-2ac9-4895-b87f-8cf6db663b17";
const img20SurgeryScheduleTablet = "https://www.figma.com/api/mcp/asset/c83a9bd1-daf1-4cdc-bc9c-1bc8f433f441";
const img21SurgeryScheduleMobile = "https://www.figma.com/api/mcp/asset/25874724-1481-4f93-be35-3538fbfe3a03";
const img22TreatmentsDesktop = "https://www.figma.com/api/mcp/asset/1c8b2c72-d3f8-4c4b-805f-7ef8099a57de";
const img23TreatmentsTablet = "https://www.figma.com/api/mcp/asset/055ced40-59da-4285-9d5c-6707416e84a8";
const img24TreatmentsMobile = "https://www.figma.com/api/mcp/asset/b412bcd9-a79d-43bd-bb00-4ee5d09ad06e";
const img25TreatmentDetailsDesktop = "https://www.figma.com/api/mcp/asset/6b01d948-45ad-4094-9afc-b5261e8795a3";
const imgImage9 = "https://www.figma.com/api/mcp/asset/098d4a41-0cb5-4628-8215-82092e446fdd";
const imgImage10 = "https://www.figma.com/api/mcp/asset/bbfef136-775a-4032-be44-9b9bc05352d2";
const imgImage11 = "https://www.figma.com/api/mcp/asset/6a4bf788-80ed-4e44-8c64-053c865c503e";
const imgImage12 = "https://www.figma.com/api/mcp/asset/4af0f7ab-d875-4179-971b-c28ada94994f";
const img28ReviewsDesktop = "https://www.figma.com/api/mcp/asset/22c6cfca-0515-418b-8c54-83206650a5da";
const img29ReviewsTablet = "https://www.figma.com/api/mcp/asset/1ccd4cc6-2023-457a-96b0-3efdb5f76488";
const img30ReviewsMobile = "https://www.figma.com/api/mcp/asset/e1190e1b-3aab-4314-bc06-890b29c37cd4";
const img31PaymentsDesktop = "https://www.figma.com/api/mcp/asset/bf3adc59-634e-49e1-be2e-2f17855db3f5";
const img32PaymentsTablet = "https://www.figma.com/api/mcp/asset/6c1eb952-3027-41d5-b4af-00be9a0e0062";
const img33PaymentsMobile = "https://www.figma.com/api/mcp/asset/83e128cd-d5c9-44ba-81f7-d10592a21c56";
const img34MessagesDesktop = "https://www.figma.com/api/mcp/asset/39546bdf-129b-4a26-bf42-0bb56df5d96b";
const img35MessagesTablet = "https://www.figma.com/api/mcp/asset/dd6f599b-30c1-4ab9-b7c4-ddd5eb76328b";
const imgImage13 = "https://www.figma.com/api/mcp/asset/d6f0ac20-1751-40e7-899e-0a543e13cc39";
const imgImage14 = "https://www.figma.com/api/mcp/asset/f41514e7-66d3-49e2-8216-fa31d513941a";

export default function Preview() {
  return (
    <div className="bg-[#e7e7e7] relative overflow-x-auto overflow-y-auto" data-name="Preview" data-node-id="442:16596" style={{ width: '100%', height: '100vh', minWidth: '24038px', minHeight: '22214px' }}>
      {/* 01. Dashboard - Desktop */}
      <div className="absolute h-[2946px] left-[-732px] top-[2081px] w-[2880px]" data-name="01. Dashboard - Desktop" data-node-id="442:16540">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img01DashboardDesktop} />
      </div>

      {/* 02. Dashboard - Tablet */}
      <div className="absolute contents left-[3500px] top-[712px]" data-name="02. Dashboard - Tablet" data-node-id="442:16543">
        <div className="absolute h-[2291px] left-[3500px] top-[3003px] w-[1600px]" data-name="Image" data-node-id="442:16541">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage} />
        </div>
        <div className="absolute h-[2291px] left-[3500px] top-[712px] w-[1600px]" data-name="Image" data-node-id="442:16542">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage1} />
        </div>
      </div>

      {/* 03. Dashboard - Mobile */}
      <div className="absolute contents left-[5180px] top-[712px]" data-name="03. Dashboard - Mobile" data-node-id="442:16547">
        <div className="absolute h-[2844px] left-[5180px] top-[6396px] w-[780px]" data-name="Image" data-node-id="442:16544">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage2} />
        </div>
        <div className="absolute h-[2842px] left-[5180px] top-[3554px] w-[780px]" data-name="Image" data-node-id="442:16545">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage3} />
        </div>
        <div className="absolute h-[2842px] left-[5180px] top-[712px] w-[780px]" data-name="Image" data-node-id="442:16546">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage4} />
        </div>
      </div>

      {/* 04. Patient - Desktop */}
      <div className="absolute h-[2104px] left-[6566px] top-[712px] w-[2880px]" data-name="04. Patient - Desktop" data-node-id="442:16548">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img04PatientDesktop} />
      </div>

      {/* 05. Patient- Tablet */}
      <div className="absolute h-[1952px] left-[9526px] top-[712px] w-[1600px]" data-name="05. Patient- Tablet" data-node-id="442:16549">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img05PatientTablet} />
      </div>

      {/* 06. Patient - Mobile */}
      <div className="absolute h-[1932px] left-[11206px] top-[712px] w-[780px]" data-name="06. Patient - Mobile" data-node-id="442:16550">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img06PatientMobile} />
      </div>

      {/* 07. Patient Details - Desktop */}
      <div className="absolute h-[2076px] left-[12592px] top-[712px] w-[2880px]" data-name="07. Patient Details - Desktop" data-node-id="442:16551">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img07PatientDetailsDesktop} />
      </div>

      {/* 08. Patient Details - Tablet */}
      <div className="absolute h-[3220px] left-[15552px] top-[712px] w-[1600px]" data-name="08. Patient Details - Tablet" data-node-id="442:16552">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img08PatientDetailsTablet} />
      </div>

      {/* 09. Patient Details - Mobile */}
      <div className="absolute contents left-[17232px] top-[712px]" data-name="09. Patient Details - Mobile" data-node-id="442:16555">
        <div className="absolute h-[2798px] left-[17232px] top-[3510px] w-[780px]" data-name="Image" data-node-id="442:16553">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage5} />
        </div>
        <div className="absolute h-[2798px] left-[17232px] top-[712px] w-[780px]" data-name="Image" data-node-id="442:16554">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage6} />
        </div>
      </div>

      {/* 10. Doctors - Desktop */}
      <div className="absolute h-[2526px] left-[18618px] top-[712px] w-[2880px]" data-name="10. Doctors - Desktop" data-node-id="442:16561">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img10DoctorsDesktop} />
      </div>

      {/* 11. Doctors - Tablet */}
      <div className="absolute h-[2972px] left-[21578px] top-[712px] w-[1600px]" data-name="11. Doctors - Tablet" data-node-id="442:16562">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img11DoctorsTablet} />
      </div>

      {/* 12. Doctors - Mobile */}
      <div className="absolute h-[4036px] left-[23258px] top-[712px] w-[780px]" data-name="12. Doctors - Mobile" data-node-id="442:16563">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img12DoctorsMobile} />
      </div>

      {/* 13. Doctor Details - Desktop */}
      <div className="absolute h-[2232px] left-[540px] top-[10217px] w-[2880px]" data-name="13. Doctor Details - Desktop" data-node-id="442:16564">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img13DoctorDetailsDesktop} />
      </div>

      {/* 14. Doctor Details - Tablet */}
      <div className="absolute h-[3572px] left-[3500px] top-[10217px] w-[1600px]" data-name="14. Doctor Details - Tablet" data-node-id="442:16565">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img14DoctorDetailsTablet} />
      </div>

      {/* 15. Doctor Details - Mobile */}
      <div className="absolute contents left-[5180px] top-[10217px]" data-name="15. Doctor Details - Mobile" data-node-id="442:16568">
        <div className="absolute h-[2728px] left-[5180px] top-[12945px] w-[780px]" data-name="Image" data-node-id="442:16566">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage7} />
        </div>
        <div className="absolute h-[2728px] left-[5180px] top-[10217px] w-[780px]" data-name="Image" data-node-id="442:16567">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage8} />
        </div>
      </div>

      {/* 16. Appointments - Desktop */}
      <div className="absolute h-[2132px] left-[6191px] top-[10693px] w-[2880px]" data-name="16. Appointments - Desktop" data-node-id="442:16569">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img16AppointmentsDesktop} />
      </div>

      {/* 17. Appointments - Tablet */}
      <div className="absolute h-[3084px] left-[9526px] top-[10217px] w-[1600px]" data-name="17. Appointments - Tablet" data-node-id="442:16570">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img17AppointmentsTablet} />
      </div>

      {/* 18. Appointments - Mobile */}
      <div className="absolute h-[3924px] left-[11206px] top-[10217px] w-[780px]" data-name="18. Appointments - Mobile" data-node-id="442:16571">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img18AppointmentsMobile} />
      </div>

      {/* 19. Surgery Schedule - Desktop */}
      <div className="absolute h-[2048px] left-[12592px] top-[10217px] w-[2880px]" data-name="19. Surgery Schedule - Desktop" data-node-id="442:16572">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img19SurgeryScheduleDesktop} />
      </div>

      {/* 20. Surgery Schedule - Tablet */}
      <div className="absolute h-[2048px] left-[15552px] top-[10217px] w-[1600px]" data-name="20. Surgery Schedule - Tablet" data-node-id="442:16573">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img20SurgeryScheduleTablet} />
      </div>

      {/* 21. Surgery Schedule - Mobile */}
      <div className="absolute h-[2040px] left-[17232px] top-[10217px] w-[780px]" data-name="21. Surgery Schedule - Mobile" data-node-id="442:16574">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img21SurgeryScheduleMobile} />
      </div>

      {/* 22. Treatments - Desktop */}
      <div className="absolute h-[2472px] left-[18618px] top-[10217px] w-[2880px]" data-name="22. Treatments - Desktop" data-node-id="442:16575">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img22TreatmentsDesktop} />
      </div>

      {/* 23. Treatments - Tablet */}
      <div className="absolute h-[3128px] left-[21578px] top-[10217px] w-[1600px]" data-name="23. Treatments - Tablet" data-node-id="442:16576">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img23TreatmentsTablet} />
      </div>

      {/* 24. Treatments - Mobile */}
      <div className="absolute h-[3976px] left-[23258px] top-[10217px] w-[780px]" data-name="24. Treatments - Mobile" data-node-id="442:16577">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img24TreatmentsMobile} />
      </div>

      {/* 25. Treatment Details - Desktop */}
      <div className="absolute h-[3300px] left-[540px] top-[16650px] w-[2880px]" data-name="25. Treatment Details - Desktop" data-node-id="442:16578">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img25TreatmentDetailsDesktop} />
      </div>

      {/* 26. Treatments Details - Tablet */}
      <div className="absolute contents left-[3500px] top-[16650px]" data-name="26. Treatments Details - Tablet" data-node-id="442:16581">
        <div className="absolute h-[2070px] left-[3500px] top-[18720px] w-[1600px]" data-name="Image" data-node-id="442:16579">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage9} />
        </div>
        <div className="absolute h-[2070px] left-[3500px] top-[16650px] w-[1600px]" data-name="Image" data-node-id="442:16580">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage10} />
        </div>
      </div>

      {/* 27. Treatment Details - Mobile */}
      <div className="absolute contents left-[5180px] top-[16650px]" data-name="27. Treatment Details - Mobile" data-node-id="442:16584">
        <div className="absolute h-[2852px] left-[5180px] top-[19502px] w-[780px]" data-name="Image" data-node-id="442:16582">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage11} />
        </div>
        <div className="absolute h-[2852px] left-[5180px] top-[16650px] w-[780px]" data-name="Image" data-node-id="442:16583">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage12} />
        </div>
      </div>

      {/* 28. Reviews - Desktop */}
      <div className="absolute h-[2188px] left-[6566px] top-[16650px] w-[2880px]" data-name="28. Reviews - Desktop" data-node-id="442:16585">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img28ReviewsDesktop} />
      </div>

      {/* 29. Reviews - Tablet */}
      <div className="absolute h-[2520px] left-[9526px] top-[16650px] w-[1600px]" data-name="29. Reviews - Tablet" data-node-id="442:16586">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img29ReviewsTablet} />
      </div>

      {/* 30. Reviews - Mobile */}
      <div className="absolute h-[3376px] left-[11206px] top-[16650px] w-[780px]" data-name="30. Reviews - Mobile" data-node-id="442:16587">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img30ReviewsMobile} />
      </div>

      {/* 31. Payments - Desktop */}
      <div className="absolute h-[2400px] left-[12592px] top-[16650px] w-[2880px]" data-name="31. Payments - Desktop" data-node-id="442:16588">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img31PaymentsDesktop} />
      </div>

      {/* 32. Payments - Tablet */}
      <div className="absolute h-[2692px] left-[15552px] top-[16650px] w-[1600px]" data-name="32. Payments - Tablet" data-node-id="442:16589">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img32PaymentsTablet} />
      </div>

      {/* 33. Payments - Mobile */}
      <div className="absolute h-[3348px] left-[17232px] top-[16650px] w-[780px]" data-name="33. Payments - Mobile" data-node-id="442:16590">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img33PaymentsMobile} />
      </div>

      {/* 34. Messages - Desktop */}
      <div className="absolute h-[2048px] left-[18618px] top-[16650px] w-[2880px]" data-name="34. Messages - Desktop" data-node-id="442:16591">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img34MessagesDesktop} />
      </div>

      {/* 35. Messages - Tablet */}
      <div className="absolute h-[3812px] left-[21578px] top-[16650px] w-[1600px]" data-name="35. Messages - Tablet" data-node-id="442:16592">
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={img35MessagesTablet} />
      </div>

      {/* 36. Messages - Mobile */}
      <div className="absolute contents left-[23258px] top-[16650px]" data-name="36. Messages - Mobile" data-node-id="442:16595">
        <div className="absolute h-[2782px] left-[23258px] top-[19432px] w-[780px]" data-name="Image" data-node-id="442:16593">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage13} />
        </div>
        <div className="absolute h-[2782px] left-[23258px] top-[16650px] w-[780px]" data-name="Image" data-node-id="442:16594">
          <img alt="" className="absolute inset-0 max-w-none object-center object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
      </div>
    </div>
  );
}

